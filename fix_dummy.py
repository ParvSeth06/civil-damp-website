import os

dummy_path = r"C:\Users\acer\.gemini\antigravity\scratch\civil-damp-website\civil-damp-website-master\src\data\dummy.js"

dampc_data = """
export const dampc = [
  {
    id: 1,
    name: 'Anika Sharma',
    role: 'Overall Head, Civil DAMP',
    year: '4th Year, B.Tech',
    email: 'anika.sharma@iitb.ac.in',
    ldap: 'anikasharma',
    phone: '+91-98XXX-XXXXX',
    linkedin: '#',
    description: 'Oversees the entire academic mentorship program, liaising with faculty coordinators, HOD office, and student representatives.',
  },
  {
    id: 2,
    name: 'Rohan Gupta',
    role: 'Overall Head, Civil DAMP',
    year: '4th Year, B.Tech',
    email: 'rohan.gupta@iitb.ac.in',
    ldap: 'rohangupta',
    phone: '+91-97XXX-XXXXX',
    linkedin: '#',
    description: 'Coordinates mentor-mentee allocations, strategic initiatives, and department-wide academic support programs.',
  },
];

"""

with open(dummy_path, "r", encoding="utf-8") as f:
    content = f.read()

# Insert before "export const facultyCoordinator"
idx = content.find("export const facultyCoordinator")
if idx != -1:
    new_content = content[:idx] + dampc_data + content[idx:]
    with open(dummy_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Added dampc back!")
