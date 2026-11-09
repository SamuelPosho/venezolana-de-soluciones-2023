#!/usr/bin/env python3
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta

print("Generando imagen SVG del Gantt...")

# Parsear XML
tree = ET.parse('Cronograma Proyecto.xml')
root = tree.getroot()
ns = {'ms': 'http://schemas.microsoft.com/project'}

# Obtener fechas
project_start = root.find('.//ms:StartDate', ns)
project_end = root.find('.//ms:FinishDate', ns)
start_date = datetime.fromisoformat(project_start.text.replace('Z', ''))
end_date = datetime.fromisoformat(project_end.text.replace('Z', ''))

print(f"Período: {start_date.strftime('%d/%m/%Y')} - {end_date.strftime('%d/%m/%Y')}")

# Extraer tareas nivel 1-3
tasks_container = root.find('.//ms:Tasks', ns)
tasks = []

for task_elem in tasks_container:
    # Usar el namespace completo en cada búsqueda
    name = task_elem.find('{http://schemas.microsoft.com/project}Name')
    start = task_elem.find('{http://schemas.microsoft.com/project}Start')
    finish = task_elem.find('{http://schemas.microsoft.com/project}Finish')
    outline = task_elem.find('{http://schemas.microsoft.com/project}OutlineLevel')
    
    if name is not None and start is not None and finish is not None and outline is not None:
        outline_level = int(outline.text)
        
        # Filtrar solo niveles 1-3
        if outline_level <= 3:
            # Escapar caracteres especiales XML
            task_name = name.text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
            if len(task_name) > 60:
                task_name = task_name[:57] + '...'
            
            tasks.append({
                'name': task_name,
                'start': datetime.fromisoformat(start.text.replace('Z', '')),
                'finish': datetime.fromisoformat(finish.text.replace('Z', '')),
                'outline': outline_level
            })

print(f"Tareas nivel 1-3: {len(tasks)}")

if len(tasks) == 0:
    print("ERROR: No se extrajeron tareas")
    exit(1)

# Dimensiones
margin_left = 420
margin_top = 100
chart_width = 2000
row_height = 35
svg_width = margin_left + chart_width + 50
svg_height = margin_top + len(tasks) * row_height + 50

# Calcular escala temporal
total_days = (end_date - start_date).days + 1
pixels_per_day = chart_width / total_days

print(f"Dimensiones: {svg_width}x{svg_height}px")
print(f"Escala: {pixels_per_day:.2f} px/día")

# Calcular meses
months = []
current = start_date.replace(day=1)
while current <= end_date:
    next_month = (current.replace(day=28) + timedelta(days=4)).replace(day=1)
    days = min((next_month - current).days, (end_date - current).days + 1)
    if days > 0:
        months.append({
            'name': current.strftime('%b %y'),
            'days': days,
            'start': (current - start_date).days
        })
    current = next_month

# Generar SVG
svg_lines = [
    f'<?xml version="1.0" encoding="UTF-8"?>',
    f'<svg width="{svg_width}" height="{svg_height}" xmlns="http://www.w3.org/2000/svg">',
    '<defs><style>',
    '.title { font: bold 18px Arial; }',
    '.subtitle { font: 11px Arial; fill: #666; }',
    '.task-text { font: 12px Arial; }',
    '.task-text-bold { font: bold 12px Arial; }',
    '.month-text { font: 10px Arial; text-anchor: middle; }',
    '</style></defs>',
    '',
    f'<rect width="{svg_width}" height="{svg_height}" fill="white"/>',
    '',
    f'<text x="20" y="30" class="title">Cronograma del Proyecto (Diagrama de Gantt)</text>',
    f'<text x="20" y="50" class="subtitle">Período: {start_date.strftime("%d/%m/%Y")} - {end_date.strftime("%d/%m/%Y")}</text>',
    ''
]

# Encabezado de meses
for month in months:
    x = margin_left + month['start'] * pixels_per_day
    width = month['days'] * pixels_per_day
    svg_lines.append(f'<rect x="{x:.1f}" y="{margin_top - 30}" width="{width:.1f}" height="25" fill="#d0d0d0" stroke="#888"/>')
    svg_lines.append(f'<text x="{x + width/2:.1f}" y="{margin_top - 12}" class="month-text">{month["name"]}</text>')

# Línea separadora
svg_lines.append(f'<line x1="{margin_left}" y1="{margin_top}" x2="{margin_left + chart_width}" y2="{margin_top}" stroke="#888" stroke-width="2"/>')

# Grid vertical
for month in months:
    x = margin_left + month['start'] * pixels_per_day
    svg_lines.append(f'<line x1="{x:.1f}" y1="{margin_top}" x2="{x:.1f}" y2="{svg_height - 30}" stroke="#ddd" stroke-width="1"/>')

# Colores por nivel
colors = {1: '#1f4e78', 2: '#4472c4', 3: '#70ad47'}

# Dibujar tareas
y = margin_top + 20
for task in tasks:
    indent = (task['outline'] - 1) * 20
    font_class = 'task-text-bold' if task['outline'] <= 2 else 'task-text'
    
    # Nombre
    svg_lines.append(f'<text x="{20 + indent}" y="{y}" class="{font_class}">{task["name"]}</text>')
    
    # Calcular barra
    days_from_start = (task['start'] - start_date).days
    duration = (task['finish'] - task['start']).days + 1
    
    bar_x = margin_left + days_from_start * pixels_per_day
    bar_width = max(3, duration * pixels_per_day)
    bar_height = 20 - (task['outline'] - 1) * 3
    bar_y = y - 14
    
    # Barra del Gantt
    svg_lines.append(
        f'<rect x="{bar_x:.1f}" y="{bar_y}" width="{bar_width:.1f}" height="{bar_height}" '
        f'fill="{colors[task["outline"]]}" stroke="#333" stroke-width="1"/>'
    )
    
    y += row_height

svg_lines.append('</svg>')

# Guardar SVG
svg_content = '\n'.join(svg_lines)
with open('gantt_cronograma.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f"✓ SVG generado: gantt_cronograma.svg ({len(svg_content)} bytes)")
print(f"✓ Tareas renderizadas: {len(tasks)}")
print(f"✓ Meses: {len(months)}")
