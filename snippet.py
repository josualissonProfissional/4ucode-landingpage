from pathlib import Path\nlines = Path('src/components/sections/Hero.tsx').read_text().splitlines()\nfor i in range(360, 440):\n    print(f'{i+1}: {lines[i]}')
