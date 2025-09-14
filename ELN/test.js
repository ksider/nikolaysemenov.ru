const SUPABASE_URL = 'https://zefwgjwlwpbsulqbhcmp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplZndnandsd3Bic3VscWJoY21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDg4MTMsImV4cCI6MjA1NTk4NDgxM30.cb3raucShv9qIhhyzLQW0txvvs5D0IimIRW1nWyziQY';
const SUPVASE_SKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplZndnandsd3Bic3VscWJoY21wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDQwODgxMywiZXhwIjoyMDU1OTg0ODEzfQ.YnS5UUVewQ1kBWX3edYGWrRqR3Jumi0HASL9gN5n_fE'    
const sp = supabase.createClient(SUPABASE_URL, SUPVASE_SKEY);

async function loadProjects() {
    try {
        let { data, error } = await sp
            .from('projects')
            .select('*');
        
        if (error) throw error;

        const projectsDiv = document.getElementById('projects');
        projectsDiv.innerHTML = '';
        data.forEach(project => {
            const div = document.createElement('div');
            div.className = 'project';
            div.innerHTML = `<strong>${project.name}</strong><br>${project.description}`;
            projectsDiv.appendChild(div);
        });
    } catch (error) {
        console.error('Ошибка при загрузке проектов:', error.message);
    }
}

async function addProject() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    if (!name || !description) {
        alert('Заполните все поля!');
        return;
    }

    try {
        const { error } = await sp
            .from('projects')
            .insert([{ name, description }]);
        
        if (error) throw error;

        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        loadProjects();
    } catch (error) {
        console.error('Ошибка при добавлении проекта:', error.message);
    }
}

loadProjects();