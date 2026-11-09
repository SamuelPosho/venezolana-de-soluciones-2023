#!/usr/bin/env python3
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta

print("Generando Diagrama de Gantt desde Cronograma Proyecto.xml...")

# Parsear XML
tree = ET.parse('Cronograma Proyecto.xml')
root = tree.getroot()
ns = {'ms': 'http://schemas.microsoft.com/project'}

# Obtener fechas del proyecto
project_start = root.find('.//ms:StartDate', ns)
project_end = root.find('.//ms:FinishDate', ns)

start_date = datetime.fromisoformat(project_start.text.replace('Z', ''))
end_date = datetime.fromisoformat(project_end.text.replace('Z', ''))

print(f"Período: {start_date.strftime('%d/%m/%Y')} - {end_date.strftime('%d/%m/%Y')}")

# Extraer tareas (niveles 1-3)
tasks_container = root.find('.//ms:Tasks', ns)
tasks = []

for task_elem in tasks_container:
    name = task_elem.find('{http://schemas.microsoft.com/project}Name')
    start = task_elem.find('{http://schemas.microsoft.com/project}Start')
    finish = task_elem.find('{http://schemas.microsoft.com/project}Finish')
    outline = task_elem.find('{http://schemas.microsoft.com/project}OutlineLevel')
    
    if name is not None and start is not None and finish is not None and outline is not None:
        outline_level = int(outline.text)
        
        # Filtrar solo niveles 1-3 (fases principales)
        if outline_level <= 3:
            tasks.append({
                'name': name.text.replace('<', '&lt;').replace('>', '&gt;'),
                'start': datetime.fromisoformat(start.text.replace('Z', '')),
                'finish': datetime.fromisoformat(finish.text.replace('Z', '')),
                'outline': outline_level
            })

print(f"Tareas nivel 1-3: {len(tasks)}")

# Calcular meses
total_days = (end_date - start_date).days + 1
months = []
current = start_date.replace(day=1)

while current <= end_date:
    next_month = (current.replace(day=28) + timedelta(days=4)).replace(day=1)
    days = min((next_month - current).days, (end_date - current).days + 1)
    if days > 0:
        months.append({'name': current.strftime('%b/%y'), 'days': days})
    current = next_month

# Generar HTML del Gantt
html = '''<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
body{font-family:Arial,sans-serif;margin:10px;background:white}
h3{margin:8px 0;font-size:14px}
table{border-collapse:collapse;font-size:8px}
th,td{border:1px solid #777;padding:2px 3px}
th{background:#c0c0c0;font-weight:bold;text-align:center}
.task{min-width:200px;text-align:left}
.t1{background:#dae8f5;font-weight:bold;font-size:9px}
.t2{padding-left:12px;font-weight:bold}
.t3{padding-left:24px}
.b1{background:#1f4e78;height:16px;margin:1px 0}
.b2{background:#4472c4;height:14px;margin:1px 0}
.b3{background:#70ad47;height:12px;margin:1px 0}
</style></head><body>
<h3>Cronograma del Proyecto (Diagrama de Gantt)</h3>
<table><thead><tr><th class="task">Actividad/Fase</th>'''

for m in months:
    html += f'<th colspan="{m["days"]}">{m["name"]}</th>'

html += '</tr></thead><tbody>'

for t in tasks:
    days_from_start = (t['start'] - start_date).days
    duration = (t['finish'] - t['start']).days + 1
    
    html += f'<tr><td class="task t{t["outline"]}">{t["name"]}</td>'
    
    # Generar las celdas del Gantt
    col_count = 0
    for day in range(total_days):
        if day >= days_from_start and day < days_from_start + duration:
            if day == days_from_start:
                html += f'<td colspan="{duration}" style="padding:0"><div class="b{t["outline"]}"></div></td>'
            col_count += 1
        else:
            if col_count == 0 or day >= days_from_start + duration:
                html += '<td style="width:2px"></td>'
    
    html += '</tr>'

html += '</tbody></table></body></html>'

# Guardar HTML
with open('gantt_cronograma.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"✓ HTML generado: gantt_cronograma.html ({len(html)} bytes)")
print(f"  Días: {total_days}, Meses: {len(months)}, Tareas: {len(tasks)}")
