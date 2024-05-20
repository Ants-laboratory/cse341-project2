document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const messageDiv = document.getElementById('message');
    const contentDiv = document.getElementById('content');
  
    loginBtn.addEventListener('click', () => {
      window.location.href = '/auth/github';
    });
  
    logoutBtn.addEventListener('click', async () => {
      await fetch('/logout');
      checkAuth();
    });
  
    async function checkAuth() {
      const response = await fetch('/auth/check');
      if (response.ok) {
        const user = await response.json();
        messageDiv.textContent = `Logged in as ${user.username || user.displayName}`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        fetchContacts();
      } else {
        messageDiv.textContent = 'Not logged in';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        contentDiv.innerHTML = '';
      }
    }
  
    async function fetchContacts() {
      const response = await fetch('/contacts');
      if (response.ok) {
        const contacts = await response.json();
        contentDiv.innerHTML = JSON.stringify(contacts, null, 2);
      } else {
        contentDiv.textContent = 'Failed to fetch contacts';
      }
    }
  
    checkAuth();
  });
  