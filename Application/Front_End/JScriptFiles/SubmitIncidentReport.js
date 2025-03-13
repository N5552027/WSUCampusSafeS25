function submitReport() {
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;

    if (!title || !date || !time || !description) {
        alert('Please fill out all fields.');
        return;
    }

    const csvData = `Title,Date,Time,Description\n${title},${date},${time},${description}\n`;
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Reports.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}