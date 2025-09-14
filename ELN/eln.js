
/*
document.getElementById('projectForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('projectName').value.trim();
    const description = document.getElementById('projectDesc').value.trim();
    await labApi.createProject({ name, description });
    loadProjects();
});

document.getElementById('experimentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('experimentName').value.trim();
    const description = document.getElementById('experimentDesc').value.trim();
    await labApi.createExperiment({ name, description });
    loadExperiments();
});

document.getElementById('sampleForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('sampleName').value.trim();
    const description = document.getElementById('sampleDesc').value.trim();
    await labApi.createSample({ name, description });
    loadSamples();
});
*/
async function loadProjects() {
    console.error('запуск');
    const container = document.getElementById('projects');
    const { data, error } = await labApi.getProjects();
    container.innerHTML = data.map(p => `<li><a data-id="${p.id}" data-name="${p.name}" data-description="${p.description}" data-created-at="${p.created_at}" data-created-by="${p.created_by}" data-updated-at="${p.updated_at}" data-updated-by="${p.updated_by}" data-is-active="${p.is_active}" data-short-name="${p.short_name}" href="#proj${p.id}" class="project ${p.is_active ? "active" : "stoped"}">${p.name}</a> <span>${p.description}</span><ul class="series" id="proj${p.id}"></ul></li>`).join('');
}

async function loadExperiments(pId) {
    const { data, error } = await labApi.getExperimentSeries(pId, true); 
    const progID = await labApi.getProjectById(pId);
    const return_string = data.map(e => `<li class='item card'><a data-id="${e.id}" data-name="${e.name}" data-description="${e.description}" data-project-id="${e.project_id}" data-created-at="${e.created_at}" data-created-by="${e.created_by}" data-updated-at="${e.updated_at}" data-updated-by="${e.updated_by}" data-is-active="${e.is_active}" class="series">${e.name}</a></li>`).join('');

   
    return return_string;
}



async function loadSamples(sid) {
  
    const { data, error } = await labApi.getSamples(sid, true);
    const serId = await labApi.getExperimentSeriesById(sid); 
    const progID = await labApi.getProjectById(serId.data.project_id);
    
    const samplist = data.map(s => `<div id="data-block">Имя: <span data-field="name">${s.name}</span>, Описание: <span data-field="description">${s.description}</span>, ID: <span data-field="id">${s.id}</span>, Код: <span data-field="generated_code">${s.generated_code}</span>, Серия: <span data-field="series_id">${s.series_id}</span>, Метаданные: <span data-field="metadata">${s.metadata}</span>, Расположение: <span data-field="storage_location">${s.storage_location}</span>, Создано: <span data-field="created_at">${s.created_at}</span> <span data-field="created_by">${s.created_by}</span>, Обновлено: <span data-field="updated_at">${s.updated_at}</span> <span data-field="updated_by">${s.updated_by}</span>, Активно: <span data-field="is_active">${s.is_active}</span></div>`).join('');

    const form_newexp = `<form action="process.php" method="post"><input type="text" name="name" value="${progID.data.name}"><textarea name="description">${progID.data.description}</textarea><input type="number" name="project_id" value="${progID.data.project_id}"><input type="datetime-local" name="created_at" value="${progID.data.created_at}"><input type="text" name="created_by" value="${progID.data.created_by}"><input type="datetime-local" name="updated_at" value="${progID.data.updated_at}"><input type="text" name="updated_by" value="${progID.data.updated_by}"><select name="is_active"><option value="1" ${progID.data.is_active == 1 ? 'selected' : ''}>Да</option><option value="0" ${progID.data.is_active == 0 ? 'selected' : ''}>Нет</option></select><input type="submit" value="Отправить"></form>`
    
    console.log(progID);
    return samplist + form_newexp;
}


function creatExampleForm() {
    
}
function getSeries() {
    
}
function getProject() {
    
}
