// lab-journal-api.js
// Клиент для работы с API лабораторного журнала в Supabase
// const SUPABASE_URL = 'https://zefwgjwlwpbsulqbhcmp.supabase.co';
// const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplZndnandsd3Bic3VscWJoY21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDg4MTMsImV4cCI6MjA1NTk4NDgxM30.cb3raucShv9qIhhyzLQW0txvvs5D0IimIRW1nWyziQY';
// const SUPVASE_SKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplZndnandsd3Bic3VscWJoY21wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDQwODgxMywiZXhwIjoyMDU1OTg0ODEzfQ.YnS5UUVewQ1kBWX3edYGWrRqR3Jumi0HASL9gN5n_fE'    
//
//

/**
 * Инициализация клиента Supabase
 * @param {string} SUPABASE_URL - URL вашего проекта Supabase
 * @param {string} SUPABASE_KEY - Ключ API вашего проекта Supabase
 * @returns {Object} Объект с методами для работы с API
 */
function initLabJournalAPI(SUPABASE_URL, SUPABASE_KEY) {
    const sp = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
    return {
      // ====================== ПРОЕКТЫ ======================
      
      /**
       * Получение списка проектов
       * @param {boolean} activeOnly - Только активные проекты
       * @returns {Promise} Promise с результатами запроса
       */
      async getProjects(activeOnly = true) {
        let query = sp.from('projects').select('*');
        
        if (activeOnly) {
          query = query.eq('is_active', true);
        }
        
        return await query.order('created_at', { ascending: false });
      },
      
      /**
       * Получение проекта по ID
       * @param {string} projectId - UUID проекта
       * @returns {Promise} Promise с результатами запроса
       */
      async getProjectById(projectId) {
        return await sp
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
      },
      
      /**
       * Создание нового проекта
       * @param {Object} projectData - Данные проекта
       * @returns {Promise} Promise с результатами запроса
       */
      async createProject(projectData) {
        const { name, description } = projectData;
        
        // Получаем ID текущего пользователя
        const { data: { user } } = await sp.auth.getUser();
        
        return await sp
          .from('projects')
          .insert({
            name,
            description,
            created_by: user.id,
            updated_by: user.id
          })
          .select()
          .single();
      },
      
      /**
       * Обновление проекта
       * @param {string} projectId - UUID проекта
       * @param {Object} projectData - Обновленные данные проекта
       * @returns {Promise} Promise с результатами запроса
       */
      async updateProject(projectId, projectData) {
        const { name, description, is_active } = projectData;
        
        // Получаем ID текущего пользователя
        const { data: { user } } = await sp.auth.getUser();
        
        return await sp
          .from('projects')
          .update({
            name,
            description,
            is_active,
            updated_by: user.id
          })
          .eq('id', projectId)
          .select()
          .single();
      },
      
      /**
       * Удаление проекта
       * @param {string} projectId - UUID проекта
       * @returns {Promise} Promise с результатами запроса
       */
      async deleteProject(projectId) {
        return await sp
          .from('projects')
          .delete()
          .eq('id', projectId);
      },
      
      // ====================== СЕРИИ ЭКСПЕРИМЕНТОВ ======================
      
      /**
       * Получение списка серий экспериментов
       * @param {string} projectId - UUID проекта (опционально)
       * @param {boolean} activeOnly - Только активные серии
       * @returns {Promise} Promise с результатами запроса
       */
      async getExperimentSeries(projectId = null, activeOnly = true) {
        let query = sp.from('experiment_series').select('*, projects(name)');
        
        if (projectId) {
          query = query.eq('project_id', projectId);
        }
        
        if (activeOnly) {
          query = query.eq('is_active', true);
        }
        
        return await query.order('created_at', { ascending: false });
      },
      
      /**
       * Получение серии экспериментов по ID
       * @param {string} seriesId - UUID серии
       * @returns {Promise} Promise с результатами запроса
       */
      async getExperimentSeriesById(seriesId) {
        return await sp
          .from('experiment_series')
          .select('*, projects(name)')
          .eq('id', seriesId)
          .single();
      },
      
      /**
       * Создание новой серии экспериментов
       * @param {Object} seriesData - Данные серии
       * @returns {Promise} Promise с результатами запроса
       */
      async createExperimentSeries(seriesData) {
        const { name, description, project_id } = seriesData;
        
        // Получаем ID текущего пользователя
        const { data: { user } } = await sp.auth.getUser();
        
        return await sp
          .from('experiment_series')
          .insert({
            name,
            description,
            project_id,
            created_by: user.id,
            updated_by: user.id
          })
          .select()
          .single();
      },
      
      /**
       * Обновление серии экспериментов
       * @param {string} seriesId - UUID серии
       * @param {Object} seriesData - Обновленные данные серии
       * @returns {Promise} Promise с результатами запроса
       */
      async updateExperimentSeries(seriesId, seriesData) {
        const { name, description, is_active } = seriesData;
        
        // Получаем ID текущего пользователя
        const { data: { user } } = await sp.auth.getUser();
        
        return await sp
          .from('experiment_series')
          .update({
            name,
            description,
            is_active,
            updated_by: user.id
          })
          .eq('id', seriesId)
          .select()
          .single();
      },
      
      /**
       * Удаление серии экспериментов
       * @param {string} seriesId - UUID серии
       * @returns {Promise} Promise с результатами запроса
       */
      async deleteExperimentSeries(seriesId) {
        return await sp
          .from('experiment_series')
          .delete()
          .eq('id', seriesId);
      },
      
      // ====================== ОБРАЗЦЫ ======================
      
      /**
       * Получение списка образцов
       * @param {string} seriesId - UUID серии (опционально)
       * @param {boolean} activeOnly - Только активные образцы
       * @returns {Promise} Promise с результатами запроса
       */
      async getSamples(seriesId = null, activeOnly = true) {
        let query = sp.from('samples').select(`
          *,
          experiment_series(name, project_id, projects(name)),
          tags(name, category)
        `);
        
        if (seriesId) {
          query = query.eq('series_id', seriesId);
        }
        
        if (activeOnly) {
          query = query.eq('is_active', true);
        }
        
        return await query.order('created_at', { ascending: false });
      },
      
      /**
       * Получение образца по ID
       * @param {string} sampleId - UUID образца
       * @returns {Promise} Promise с результатами запроса
       */
      async getSampleById(sampleId) {
        return await sp
          .from('samples')
          .select(`
            *,
            experiment_series(name, project_id, projects(name)),
            tags(name, category)
          `)
          .eq('id', sampleId)
          .single();
      },
      
      /**
       * Создание нового образца
       * @param {Object} sampleData - Данные образца
       * @returns {Promise} Promise с результатами запроса
       */
      async createSample(sampleData) {
        const { name, series_id, metadata, storage_location } = sampleData;
        
        // Получаем ID текущего пользователя
        const { data: { user } } = await sp.auth.getUser();
        
        // Начинаем транзакцию
        const { data: newSample, error: sampleError } = await sp
          .from('samples')
          .insert({
            name,
            series_id,
            metadata,
            storage_location,
            created_by: user.id,
            updated_by: user.id
          })
          .select()
          .single();
        
        if (sampleError) throw sampleError;
        
        // Если есть теги, добавляем их
        if (sampleData.tags && sampleData.tags.length > 0) {
          const tagsToInsert = sampleData.tags.map(tag => ({
            sample_id: newSample.id,
            name: tag.name,
            category: tag.category || 'general'
          }));
          
          const { error: tagError } = await sp.from('tags').insert(tagsToInsert);
          if (tagError) throw tagError;
        }
        
        return newSample;
      },
      
      /**
       * Обновление образца
       * @param {string} sampleId - UUID образца
       * @param {Object} sampleData - Обновленные данные образца
       * @returns {Promise} Promise с результатами запроса
       */
      async updateSample(sampleId, sampleData) {
        const { name, metadata, storage_location, is_active } = sampleData;
        
        // Получаем ID текущего пользователя
        const { data: { user } } = await sp.auth.getUser();
        
        return await sp
          .from('samples')
          .update({
            name,
            metadata,
            storage_location,
            is_active,
            updated_by: user.id
          })
          .eq('id', sampleId)
          .select()
          .single();
      },
      
      /**
       * Удаление образца
       * @param {string} sampleId - UUID образца
       * @returns {Promise} Promise с результатами запроса
       */
      async deleteSample(sampleId) {
        return await sp
          .from('samples')
          .delete()
          .eq('id', sampleId);
      },
      
      // ====================== ТЕГИ ======================
      
      /**
       * Получение тегов для образца
       * @param {string} sampleId - UUID образца
       * @returns {Promise} Promise с результатами запроса
       */
      async getSampleTags(sampleId) {
        return await sp
          .from('tags')
          .select('*')
          .eq('sample_id', sampleId);
      },
      
      /**
       * Добавление тега к образцу
       * @param {string} sampleId - UUID образца
       * @param {string} tagName - Название тега
       * @param {string} category - Категория тега (опционально)
       * @returns {Promise} Promise с результатами запроса
       */
      async addTagToSample(sampleId, tagName, category = 'general') {
        return await sp
          .from('tags')
          .insert({
            sample_id: sampleId,
            name: tagName,
            category
          })
          .select()
          .single();
      },
      
      /**
       * Удаление тега с образца
       * @param {string} tagId - UUID тега
       * @returns {Promise} Promise с результатами запроса
       */
      async removeTag(tagId) {
        return await sp
          .from('tags')
          .delete()
          .eq('id', tagId);
      },
      
      // ====================== ТЕСТЫ ======================
      
      /**
       * Получение тестов образца
       * @param {string} sampleId - UUID образца
       * @returns {Promise} Promise с результатами запроса
       */
      async getSampleTests(sampleId) {
        return await sp
          .from('tests')
          .select('*, users!performed_by(username)')
          .eq('sample_id', sampleId);
      },
      
      /**
       * Получение теста по ID
       * @param {string} testId - UUID теста
       * @returns {Promise} Promise с результатами запроса
       */
      async getTestById(testId) {
        return await sp
          .from('tests')
          .select('*, users!performed_by(username)')
          .eq('id', testId)
          .single();
      },
      
      /**
       * Создание нового теста для образца
       * @param {Object} testData - Данные теста
       * @returns {Promise} Promise с результатами запроса
       */
      async createTest(testData) {
        const { sample_id, test_type, test_data, test_results, status } = testData;
        
        // Получаем ID текущего пользователя
        const { data: { user } } = await sp.auth.getUser();
        
        return await sp
          .from('tests')
          .insert({
            sample_id,
            test_type,
            test_data,
            test_results,
            performed_by: user.id,
            status: status || 'pending'
          })
          .select()
          .single();
      },
      
      /**
       * Обновление теста
       * @param {string} testId - UUID теста
       * @param {Object} testData - Обновленные данные теста
       * @returns {Promise} Promise с результатами запроса
       */
      async updateTest(testId, testData) {
        const { test_data, test_results, status } = testData;
        
        return await sp
          .from('tests')
          .update({
            test_data,
            test_results,
            status,
            updated_at: new Date()
          })
          .eq('id', testId)
          .select()
          .single();
      },
      
      /**
       * Удаление теста
       * @param {string} testId - UUID теста
       * @returns {Promise} Promise с результатами запроса
       */
      async deleteTest(testId) {
        return await sp
          .from('tests')
          .delete()
          .eq('id', testId);
      },
      
      // ====================== ПОИСК ======================
      
      /**
       * Поиск образцов
       * @param {Object} searchParams - Параметры поиска
       * @returns {Promise} Promise с результатами запроса
       */
      async searchSamples(searchParams) {
        const { query, tags, dateFrom, dateTo, projectId, seriesId } = searchParams;
        
        // Используем представление sample_search для поиска
        let queryBuilder = sp.from('sample_search').select('*');
        
        // Текстовый поиск
        if (query) {
          queryBuilder = queryBuilder.or(`name.ilike.%${query}%, generated_code.ilike.%${query}%, project_name.ilike.%${query}%, series_name.ilike.%${query}%`);
        }
        
        // Фильтр по тегам
        if (tags && tags.length > 0) {
          // Supabase не поддерживает прямое сравнение массивов, 
          // поэтому используем containedBy для проверки вхождения
          tags.forEach(tag => {
            queryBuilder = queryBuilder.filter('tags', 'cs', `{${tag}}`);
          });
        }
        
        // Фильтр по дате
        if (dateFrom) {
          queryBuilder = queryBuilder.gte('created_at', dateFrom);
        }
        
        if (dateTo) {
          queryBuilder = queryBuilder.lte('created_at', dateTo);
        }
        
        // Фильтр по проекту
        if (projectId) {
          queryBuilder = queryBuilder.eq('project_id', projectId);
        }
        
        // Фильтр по серии
        if (seriesId) {
          queryBuilder = queryBuilder.eq('series_id', seriesId);
        }
        
        return await queryBuilder.order('created_at', { ascending: false });
      }
    };
  }
  
  // Пример использования:
  // const labApi = initLabJournalAPI(SUPABASE_URL, SUPABASE_KEY);
  //
  // async function createTestProject() {
  //   try {
  //     const project = await labApi.createProject({
  //       name: 'Мой проект',
  //       description: 'Описание моего проекта'
  //     });
  //     console.log('Проект создан:', project);
  //   } catch (error) {
  //     console.error('Ошибка при создании проекта:', error);
  //   }
  // }