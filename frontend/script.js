document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const tableBody = document.querySelector('#studentTable tbody');

    const updateValue = false;
    const updateId = null;

    // Function to fetch all students from the API and populate the table
    function fetchStudents() {
        fetch('http://localhost:8000/students')
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(student => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.branch}</td>
                        <td>
                            <button onclick="editStudent('${student.id}')">Edit</button>
                            <button onclick="deleteStudent('${student.id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching students:', error));
    }

    // Function to handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const studentData = {
            id: formData.get('id'),
            name: formData.get('name'),
            branch: formData.get('branch')
        };

        fetch('http://localhost:8000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Student added:', data);
            fetchStudents(); // Refresh the table after adding a student
            form.reset(); // Reset the form
        })
        .catch(error => console.error('Error adding student:', error));
    });

    // Function to delete a student
    window.deleteStudent = function(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            fetch(`http://localhost:8000/students/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    fetchStudents(); // Refresh the table after deleting a student
                } else {
                    console.error('Failed to delete student');
                }
            })
            .catch(error => console.error('Error deleting student:', error));
        }
    };

    // Initial fetch to populate the table
    fetchStudents();
});
