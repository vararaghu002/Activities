document.getElementById('fetchDataBtn').addEventListener('click', fetchData);

async function fetchData() {
    const username = document.getElementById('username').value;
    const output = document.getElementById('output');
    output.innerHTML = 'Fetching data...';
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const data = await response.json();
        output.innerHTML =`    ${data.name || 'No Name Available'} (@${data.login})
    <img src="${data.avatar_url}" alt="Avatar" width="100" height="100">
    <strong>Bio:</strong> ${data.bio || 'No bio available'}
    <strong>Location:</strong> ${data.location || 'Not provided'}
    <strong>Public Repositories:</strong> ${data.public_repos}
    <strong>Followers:</strong> ${data.followers}
    <strong>Following:</strong> ${data.following}
    <a style="color:white;" href="${data.html_url}" target="_blank">View GitHub Profile</a>`;
        }
        catch (error) {
            output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        }
}
