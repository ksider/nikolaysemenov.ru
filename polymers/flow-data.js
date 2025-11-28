window.flowData = {
  start: {
    type: 'question',
    title: {
      ru: 'Пластиковый материал',
      en: 'Plastic Material'
    },
    text: {
      ru: 'Прижмите к образцу нагретый металлический наконечник. Размягчается ли материал?',
      en: 'Press a heated metal tip against the sample. Does the material soften?'
    },
    description: {
      ru: 'Нагрев и горение дают только ориентировочные признаки. Вспенивание, наполнители и антипирены могут сильно менять поведение. Схема не даёт однозначной идентификации и не заменяет лабораторный анализ.',
      en: 'Heating and burning only provide indicative signs. Foaming, fillers and flame-retardants can strongly modify behaviour. This flow does not give a unique ID and does not replace lab analysis.'
    },
    media: {
      type: 'youtube',
      videoId: 'LM9wOFSaH7M',
      controls: false,
      orientation: 'portrait',
      params: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    },
    options: [
      {
        label: {
          ru: 'Да, размягчается',
          en: 'Yes, it softens'
        },
        note: {
          ru: 'Термопласт',
          en: 'Thermoplastic'
        },
        next: 'thermoplastic_water'
      },
      {
        label: {
          ru: 'Нет, не размягчается',
          en: 'No, it does not soften'
        },
        note: {
          ru: 'Термореактивный пластик',
          en: 'Thermosetting plastic'
        },
        next: 'thermoset_burn'
      }
    ]
  },

  /* ---------------- THERMOPLAST BRANCH ---------------- */

  thermoplastic_water: {
    type: 'question',
    title: {
      ru: 'Термопласт',
      en: 'Thermoplastic'
    },
    text: {
      ru: 'Бросьте маленький образец в воду. Он плавает или тонет?',
      en: 'Drop a small sample into water. Does it float or sink?'
    },
    description: {
      ru: 'Этот шаг грубо разделяет материалы по плотности. Плавающие образцы чаще всего низкоплотные полиолефины или вспенённые материалы. Наполнители (мел, стекло и т.п.) и пена легко меняют поведение, поэтому это не точный тест на тип полимера.',
      en: 'This step crudely separates materials by density. Floating samples are often low-density polyolefins or foams. Fillers (chalk, glass, etc.) and foaming strongly affect behaviour, so this is not an exact polymer ID test.'
    },
    media: {
      type: 'youtube',
      videoId: 'ePyAYGDwtjY',
      controls: false,
      orientation: 'portrait',
      // caption:   { ru: 'серый минеральный остаток', en: 'grey mineral residue' },
      
      params: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    },
    options: [
      {
        label: {
          ru: 'Плавает',
          en: 'Floats'
        },
        note: {
          ru: 'Полиолефины / пены',
          en: 'Polyolefins / foams'
        },
        next: 'polyolefins_smell'
      },
      {
        label: {
          ru: 'Тонет',
          en: 'Sinks'
        },
        note: {
          ru: 'Более плотные термопласты',
          en: 'Denser thermoplastics'
        },
        next: 'thermoplastic_burn_flame'
      }
    ]
  },

  polyolefins_smell: {
    type: 'question',
    title: {
      ru: 'Полиолефины',
      en: 'Polyolefins'
    },
    text: {
      ru: 'При сжигании небольшого образца какой запах вы ощущаете?',
      en: 'When burning a small sample, what odour do you notice?'
    },
    description: {
      ru: 'Полиэтилен, полипропилен, некоторые TPE и EVA-пены могут вести себя похоже. Запах, мягкость и прозрачность дают только наиболее вероятную версию, а не гарантию.',
      en: 'Polyethylene, polypropylene, some TPEs and EVA foams can behave similarly. Odour, softness and clarity only suggest the most likely option, not a guarantee.'
    },
    options: [
      {
        label: {
          ru: 'Парафин, тёплый запах свечи',
          en: 'Paraffin, warm candle smell'
        },
        next: 'pe'
      },
      {
        label: {
          ru: 'Более едкий, «дизельный» запах',
          en: 'More acrid, “diesel-like” smell'
        },
        next: 'pp'
      },
      {
        label: {
          ru: 'Образец прозрачный и очень жёсткий, запах слабый',
          en: 'Sample is very clear and rigid, odour is weak'
        },
        next: 'tpx'
      }
    ]
  },

  pe: {
    type: 'result',
    title: {
      ru: 'Полиэтилен (PE)',
      en: 'Polyethylene (PE)'
    },
    description: {
      ru: 'Типичный представитель плавающих полиолефинов. Вспенённые и наполненные марки могут вести себя иначе.',
      en: 'Typical example of a floating polyolefin. Foamed and filled grades may behave differently.'
    },
    materials: [
      {
        name: {
          ru: 'Полиэтилен (PE)',
          en: 'Polyethylene (PE)'
        },
        flame: {
          ru: 'Синее пламя с жёлтым кончиком',
          en: 'Blue flame with yellow tip'
        },
        odour: {
          ru: 'Парафин, свеча',
          en: 'Paraffin, candle-like'
        },
        speed: {
          ru: 'Быстро',
          en: 'Fast'
        },
        other: {
          ru: 'Часто плавает в воде, образует горячие капли расплава',
          en: 'Often floats in water, produces hot dripping melt'
        }
      }
    ]
  },

  pp: {
    type: 'result',
    title: {
      ru: 'Полипропилен (PP)',
      en: 'Polypropylene (PP)'
    },
    description: {
      ru: 'Плавающий полиолефин с большей жёсткостью, чем PE. Наполнители могут утопить образец.',
      en: 'Floating polyolefin with higher stiffness than PE. Fillers can make a sample sink.'
    },
    materials: [
      {
        name: {
          ru: 'Полипропилен (PP)',
          en: 'Polypropylene (PP)'
        },
        flame: {
          ru: 'Синее пламя с жёлтым кончиком',
          en: 'Blue flame with yellow tip'
        },
        odour: {
          ru: 'Едкий, дизельный',
          en: 'Acrid, diesel-like'
        },
        speed: {
          ru: 'Быстро',
          en: 'Fast'
        },
        other: {
          ru: 'Образует горячие капли расплава, обычно плавает в воде',
          en: 'Produces hot dripping melt, usually floats in water'
        }
      }
    ]
  },

  tpx: {
    type: 'result',
    title: {
      ru: 'Полиметилпентен (TPX)',
      en: 'Polymethylpentene (TPX)'
    },
    description: {
      ru: 'Прозрачный полиолефин с очень низкой плотностью и высоким Tm. На практике встречается реже, чем PE/PP.',
      en: 'Transparent polyolefin with very low density and high Tm. Less common in everyday items than PE/PP.'
    },
    materials: [
      {
        name: {
          ru: 'TPX',
          en: 'TPX'
        },
        flame: {
          ru: 'Ярко-жёлтое пламя',
          en: 'Bright yellow flame'
        },
        odour: {
          ru: 'Слабый парафиновый',
          en: 'Weak paraffin-like'
        },
        speed: {
          ru: 'Быстро',
          en: 'Fast'
        },
        other: {
          ru: 'Очень лёгкий, прозрачный, плавает в воде',
          en: 'Very light, transparent, floats in water'
        }
      }
    ]
  },

  thermoplastic_burn_flame: {
    type: 'question',
    title: {
      ru: 'Другие термопласты',
      en: 'Other Thermoplastics'
    },
    text: {
      ru: 'При поджигании образца появляется устойчивое пламя?',
      en: 'When ignited, does a stable flame appear?'
    },
    description: {
      ru: 'Отсутствие устойчивого пламени типично для фторополимеров и сильно огнестойких композиций, но отдельные FR-марки других пластиков тоже могут вести себя похоже.',
      en: 'Lack of stable flame is typical for fluoropolymers and highly flame-retarded compounds, but some FR grades of other plastics can behave similarly.'
    },
    options: [
      {
        label: {
          ru: 'Нет, пламя не держится',
          en: 'No, it does not sustain a flame'
        },
        next: 'no_flames_drips'
      },
      {
        label: {
          ru: 'Да, пламя есть',
          en: 'Yes, a flame appears'
        },
        next: 'flame_present'
      }
    ]
  },

  no_flames_drips: {
    type: 'question',
    title: {
      ru: 'Не поддерживает пламя',
      en: 'Does Not Sustain Flame'
    },
    text: {
      ru: 'Образец при нагреве плавится и образует капли/нити расплава или почти не меняет форму?',
      en: 'When heated, does the sample melt and form drips/strings or barely change shape?'
    },
    description: {
      ru: 'Типичное поведение фторополимеров, но так могут вести себя и отдельные сильно огнестойкие композиты. Это ветка «наиболее вероятного варианта», а не жёсткая классификация.',
      en: 'Typical for fluoropolymers, but some highly flame-retarded compounds may behave similarly. This branch suggests the most likely family rather than a hard classification.'
    },
    options: [
      {
        label: {
          ru: 'Да, образуются капли/нити расплава',
          en: 'Yes, drips/strings of melt form'
        },
        next: 'ctfe'
      },
      {
        label: {
          ru: 'Нет, форма почти не меняется, только белеет/усаживается',
          en: 'No, shape barely changes, only whitens/shrinks'
        },
        next: 'fluoro_polymers'
      }
    ]
  },

  ctfe: {
    type: 'result',
    title: {
      ru: 'Полихлортрифторэтилен (PCTFE)',
      en: 'PCTFE'
    },
    description: {
      ru: 'Более плавкий фторополимер. В реальных изделиях поведение может искажаться наполнителями и конструкцией детали.',
      en: 'More fusible fluoropolymer. In real parts the behaviour can be distorted by fillers and part design.'
    },
    materials: [
      {
        name: {
          ru: 'PCTFE',
          en: 'PCTFE'
        },
        flame: {
          ru: 'Пламя слабое или неустойчивое',
          en: 'Weak or unstable flame'
        },
        odour: {
          ru: 'Слабый химический',
          en: 'Weak chemical'
        },
        speed: {
          ru: 'Почти не горит',
          en: 'Hardly burns'
        },
        other: {
          ru: 'Даёт прозрачные нити расплава, сохраняет форму',
          en: 'Forms clear melt strings, keeps shape'
        }
      }
    ]
  },

  fluoro_polymers: {
    type: 'result',
    title: {
      ru: 'Фторполимеры (PTFE, FEP и др.)',
      en: 'Fluoropolymers (PTFE, FEP, etc.)'
    },
    description: {
      ru: 'Материал не поддерживает пламя и практически не плавится. Похожий эффект могут давать и отдельные высоко FR-композиции — особенно в толстых деталях.',
      en: 'Material does not sustain flame and barely melts. Some highly FR-compounds, especially in thick parts, can show similar behaviour.'
    },
    materials: [
      {
        name: {
          ru: 'PTFE, FEP и др.',
          en: 'PTFE, FEP, etc.'
        },
        flame: {
          ru: 'Пламя не поддерживается',
          en: 'Does not sustain flame'
        },
        odour: {
          ru: 'Почти без запаха (токсичные продукты разложения)',
          en: 'Hardly any odour (decomposition fumes toxic)'
        },
        speed: {
          ru: 'Не горит',
          en: 'Does not burn'
        },
        other: {
          ru: 'Белая усадка, форма почти не меняется',
          en: 'Whitens and shrinks, shape barely changes'
        }
      }
    ]
  },

  flame_present: {
    type: 'question',
    title: {
      ru: 'Пламя присутствует',
      en: 'Flame Present'
    },
    text: {
      ru: 'Как ведёт себя образец после удаления источника огня?',
      en: 'How does the sample behave after removing the flame source?'
    },
    description: {
      ru: 'FR-марки многих полимеров могут переключаться между режимами «горит» и «самозатухает» в зависимости от толщины и ориентации образца. Ветка даёт вероятное направление, а не окончательный вердикт.',
      en: 'FR grades of many polymers may switch between “burns” and “self-extinguishes” depending on thickness and orientation. This branch gives a likely direction, not a final verdict.'
    },
    media: {
      type: 'youtube',
      videoId: 'Vuk_gGJxj4s',
      controls: false,
      orientation: 'portrait',
      // caption:   { ru: 'серый минеральный остаток', en: 'grey mineral residue' },
      
      params: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    },
    options: [
      {
        label: {
          ru: 'Продолжает гореть',
          en: 'Continues to burn'
        },
        next: 'continues_drips'
      },
      {
        label: {
          ru: 'Самозатухает',
          en: 'Self-extinguishes'
        },
        next: 'self_ext_drips'
      }
    ]
  },

  continues_drips: {
    type: 'question',
    title: {
      ru: 'Горит и капает?',
      en: 'Burns and drips?'
    },
    text: {
      ru: 'Во время горения образуются капли расплава?',
      en: 'Does the sample form dripping melt while burning?'
    },
    description: {
      ru: 'Наличие горячих капель характерно для многих термопластов. Пены и сильно наполненные материалы могут выглядеть иначе.',
      en: 'Hot dripping melt is typical for many thermoplastics. Foamed and heavily filled materials may look different.'
    },
    media: {
      type: 'youtube',
      videoId: '8M7PbGsVfLg',
      controls: false,
      orientation: 'portrait',
       caption:   { ru: 'С каплями и без капель расплава', en: 'With and without molten droplets' },
      
      params: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    },
    options: [
      {
        label: {
          ru: 'Да, заметные капли расплава',
          en: 'Yes, noticeable dripping melt'
        },
        next: 'continues_drips_yes'
      },
      {
        label: {
          ru: 'Нет, капель почти нет',
          en: 'No or hardly any drips'
        },
        next: 'continues_drips_no'
      }
    ]
  },

  continues_drips_yes: {
    type: 'question',
    title: {
      ru: 'Капли и дым (горящие термопласты)',
      en: 'Drips and smoke (burning thermoplastics)'
    },
    text: {
      ru: 'Какой запах и дым вы наблюдаете?',
      en: 'What odour and smoke do you observe?'
    },
    description: {
      ru: 'Стирольные, целлулоидные и ABS-системы частично перекрываются по запаху и дыму. Выбор варианта — это «наиболее похоже», а не строгое правило.',
      en: 'Styrenics, celluloid and ABS may overlap in odour and smoke. Choosing an option here is “what it resembles most”, not a strict rule.'
    },
    options: [
      {
        label: {
          ru: 'Сладкий запах стирола, чёрный дым',
          en: 'Sweet styrene odour, black smoke'
        },
        next: 'ps'
      },
      {
        label: {
          ru: 'Густой чёрный дым, оттенок резины',
          en: 'Dense black smoke, rubbery note'
        },
        next: 'hips_san'
      },
      {
        label: {
          ru: 'Уксусный/ацетоновый запах, искры',
          en: 'Vinegar/acetone smell, sparks'
        },
        next: 'cellulosics'
      },
      {
        label: {
          ru: 'Почти без дыма, спиртовой запах',
          en: 'Almost no smoke, alcohol-like smell'
        },
        next: 'pmma'
      },
      {
        label: {
          ru: 'Резкий запах формальдегида',
          en: 'Sharp formaldehyde smell'
        },
        next: 'pom'
      },
      {
        label: {
          ru: 'Характерный запах ABS / «LEGO»',
          en: 'Typical ABS / “LEGO” smell'
        },
        next: 'abs'
      },
      {
        label: {
          ru: 'Запах плавящейся ткани/резины, голубоватые края пламени',
          en: 'Melting textile/rubber smell, bluish flame edges'
        },
        next: 'pet'
      }
    ]
  },

  ps: {
    type: 'result',
    title: {
      ru: 'Полистирол (PS)',
      en: 'Polystyrene (PS)'
    },
    description: {
      ru: 'Стирольный термопласт, дающий густой чёрный дым. Вспенённые формы (пенополистирол) горят иначе, но запах стирола сохраняется.',
      en: 'Styrenic thermoplastic producing dense black smoke. Foamed forms (EPS) burn differently in shape but keep the styrene odour.'
    },
    materials: [
      {
        name: {
          ru: 'Полистирол (PS)',
          en: 'Polystyrene (PS)'
        },
        flame: {
          ru: 'Ярко-жёлтое пламя',
          en: 'Bright yellow flame'
        },
        odour: {
          ru: 'Стирол, сладкий химический',
          en: 'Styrene, sweet chemical'
        },
        speed: {
          ru: 'Быстро',
          en: 'Fast'
        },
        other: {
          ru: 'Густой чёрный дым, горячие капли',
          en: 'Dense black smoke, flaming drips'
        }
      }
    ]
  },

  hips_san: {
    type: 'result',
    title: {
      ru: 'HIPS / SAN',
      en: 'HIPS / SAN'
    },
    description: {
      ru: 'Ударопрочные и модифицированные стирольные пластики. Антипиренные марки могут давать менее выраженное пламя.',
      en: 'Impact-modified styrenics. Flame-retarded grades may show weaker flame.'
    },
    materials: [
      {
        name: {
          ru: 'HIPS, SAN',
          en: 'HIPS, SAN'
        },
        flame: {
          ru: 'Жёлтое пламя',
          en: 'Yellow flame'
        },
        odour: {
          ru: 'Стирол с резиновым/нитрильным оттенком',
          en: 'Styrene with rubber/nitrile note'
        },
        speed: {
          ru: 'Средне/быстро',
          en: 'Medium/fast'
        },
        other: {
          ru: 'Ещё более густой дым и сажа, чем у PS',
          en: 'Heavier smoke and soot than PS'
        }
      }
    ]
  },

  cellulosics: {
    type: 'result',
    title: {
      ru: 'Целлулоидные пластики',
      en: 'Cellulosic plastics'
    },
    description: {
      ru: 'Ранние пластики на основе целлюлозы, сильно горючие. В современных изделиях встречаются редко.',
      en: 'Early cellulose-based plastics, highly flammable. Rare in modern products.'
    },
    materials: [
      {
        name: {
          ru: 'Целлулоид / ацетилцеллюлоза',
          en: 'Celluloid / cellulose acetate'
        },
        flame: {
          ru: 'Жёлтое пламя с искрами',
          en: 'Yellow flame with sparks'
        },
        odour: {
          ru: 'Уксус, ацетон',
          en: 'Vinegar, acetone'
        },
        speed: {
          ru: 'Очень быстро',
          en: 'Very fast'
        },
        other: {
          ru: 'Может гореть почти мгновенно, с хлопком',
          en: 'May burn almost explosively, with popping'
        }
      }
    ]
  },

  abs: {
    type: 'result',
    title: {
      ru: 'АБС-пластик',
      en: 'ABS'
    },
    description: {
      ru: 'Ударопрочный стирольный пластик с характерным запахом. FR-марки используются в электронике и могут сильнее самозатухать.',
      en: 'Impact-resistant styrenic plastic with characteristic odour. FR grades are used in electronics and can self-extinguish more strongly.'
    },
    materials: [
      {
        name: {
          ru: 'ABS',
          en: 'ABS'
        },
        flame: {
          ru: 'Жёлтое пламя',
          en: 'Yellow flame'
        },
        odour: {
          ru: 'Стирол + резиновый оттенок',
          en: 'Styrene with rubber tone'
        },
        speed: {
          ru: 'Средне/быстро',
          en: 'Medium/fast'
        },
        other: {
          ru: 'Густой дым, горячие капли, узнаваемый запах «LEGO»',
          en: 'Dense smoke, flaming drips, recognisable “LEGO” smell'
        }
      }
    ]
  },

  continues_drips_no: {
    type: 'question',
    title: {
      ru: 'Без капель, но горит',
      en: 'No drips, but burns'
    },
    text: {
      ru: 'Как выглядят дым и запах?',
      en: 'How do smoke and odour behave?'
    },
    description: {
      ru: 'Отсутствие капель характерно для более жёстких инженерных термопластов, но заполнители и армирование могут слегка менять картину.',
      en: 'Lack of drips is typical for more rigid engineering thermoplastics, but fillers and reinforcement may slightly modify the picture.'
    },
    options: [
      {
        label: {
          ru: 'Сладковатый химический/резиновый запах, лёгкий чёрный дым',
          en: 'Sweet chemical/rubbery smell, slight black smoke'
        },
        next: 'pur'
      }
    ]
  },

  pur: {
    type: 'result',
    title: {
      ru: 'Полиуретан (TPUR)',
      en: 'Polyurethane (TPUR)'
    },
    description: {
      ru: 'Термопластичный полиуретан без антипиренов может продолжать горение, даёт лёгкий чёрный дым и почти не образует капель.',
      en: 'Non-FR thermoplastic polyurethane can keep burning, gives slight black smoke and forms little to no drips.'
    },
    materials: [
      {
        name: {
          ru: 'TPUR',
          en: 'TPUR'
        },
        flame: {
          ru: 'Жёлтое пламя',
          en: 'Yellow flame'
        },
        odour: {
          ru: 'Сладковатый химический, резиновый',
          en: 'Sweet chemical, rubbery'
        },
        speed: {
          ru: 'Быстро',
          en: 'Fast'
        },
        other: {
          ru: 'Слабый чёрный дым, капли почти не образуются',
          en: 'Slight black smoke, hardly any drips'
        }
      }
    ]
  },

  pmma: {
    type: 'result',
    title: {
      ru: 'Акрил (PMMA)',
      en: 'Acrylic (PMMA)'
    },
    description: {
      ru: 'Прозрачный термопласт с чистым пламенем и малым дымом. Вспенённые или сильно пигментированные модификации могут выглядеть иначе.',
      en: 'Transparent thermoplastic with clean flame and low smoke. Foamed or heavily pigmented grades may look different.'
    },
    materials: [
      {
        name: {
          ru: 'PMMA',
          en: 'PMMA'
        },
        flame: {
          ru: 'Ярко-жёлтое пламя',
          en: 'Bright yellow flame'
        },
        odour: {
          ru: 'Метилированные спирты',
          en: 'Methylated spirit-like'
        },
        speed: {
          ru: 'Быстро',
          en: 'Fast'
        },
        other: {
          ru: 'Горит ровно, дым слабый',
          en: 'Burns smoothly, low smoke'
        }
      }
    ]
  },

  pom: {
    type: 'result',
    title: {
      ru: 'Полиоксиметилен (ацеталь)',
      en: 'Polyoxymethylene (acetal)'
    },
    description: {
      ru: 'Инженерный пластик с характерным запахом формальдегида. FR-версии могут быть более склонны к самозатуханию.',
      en: 'Engineering plastic with formaldehyde odour. FR versions may self-extinguish more easily.'
    },
    materials: [
      {
        name: {
          ru: 'POM',
          en: 'POM'
        },
        flame: {
          ru: 'Жёлтое пламя',
          en: 'Yellow flame'
        },
        odour: {
          ru: 'Формальдегид',
          en: 'Formaldehyde'
        },
        speed: {
          ru: 'Медленно',
          en: 'Slow'
        },
        other: {
          ru: 'Мало дыма, склонность к тлению',
          en: 'Little smoke, tends to smoulder'
        }
      }
    ]
  },

  pet: {
    type: 'result',
    title: {
      ru: 'ПЭТ (PET)',
      en: 'PET'
    },
    description: {
      ru: 'Полиэфир с характерным запахом плавящейся ткани. В армированных и FR-системах картина горения меняется.',
      en: 'Polyester with a melting textile odour. In reinforced and FR systems, burn behaviour changes.'
    },
    materials: [
      {
        name: {
          ru: 'PET',
          en: 'PET'
        },
        flame: {
          ru: 'Жёлтое пламя с голубыми краями',
          en: 'Yellow flame with blue edges'
        },
        odour: {
          ru: 'Горящая ткань/резина',
          en: 'Burning textile/rubber'
        },
        speed: {
          ru: 'Средняя',
          en: 'Medium'
        },
        other: {
          ru: 'Вязкий расплав, может вытягиваться нитями',
          en: 'Viscous melt, may form threads'
        }
      }
    ]
  },

  self_ext_drips: {
    type: 'question',
    title: {
      ru: 'Самозатухающие термопласты',
      en: 'Self-extinguishing thermoplastics'
    },
    text: {
      ru: 'Образец эластичный или жёсткий? Какой запах?',
      en: 'Is the sample elastic or rigid? What odour is noticeable?'
    },
    description: {
      ru: 'Самозатухание часто связано с FR-добавками. Одинаковые визуальные признаки могут соответствовать разным системам (PA, TPU, FR-смеси).',
      en: 'Self-extinguishing behaviour is often due to FR additives. Similar visual signs may correspond to different systems (PA, TPU, FR-blends).'
    },
    options: [
      {
        label: {
          ru: 'Запах прожжённых волос, жёсткий материал',
          en: 'Burnt hair smell, rigid material'
        },
        next: 'nylon'
      },
      {
        label: {
          ru: 'Эластичный, запах резины/TPU',
          en: 'Elastic, rubber/TPU-like smell'
        },
        next: 'tpu'
      },
      {
        label: {
          ru: 'Белый едкий дым, запах соляной кислоты',
          en: 'White acrid smoke, HCl-like smell'
        },
        next: 'pvc'
      },
      {
        label: {
          ru: 'Дым умеренный, фенольный/инженерный запах',
          en: 'Moderate smoke, phenolic/engineering plastic smell'
        },
        next: 'self_ext_no_drips_odour'
      }
    ]
  },

  nylon: {
    type: 'result',
    title: {
      ru: 'Полиамид (нейлон)',
      en: 'Polyamide (Nylon)'
    },
    description: {
      ru: 'Инженерный пластик, часто самозатухающий. Заполнители и стекловолокно могут менять вид дыма и скорость горения.',
      en: 'Engineering plastic, often self-extinguishing. Fillers and glass fibre can change smoke appearance and burn rate.'
    },
    materials: [
      {
        name: {
          ru: 'Нейлон (PA)',
          en: 'Nylon (PA)'
        },
        flame: {
          ru: 'Жёлтое пламя с голубым кончиком',
          en: 'Yellow flame with blue tip'
        },
        odour: {
          ru: 'Прожжённые волосы',
          en: 'Burnt hair'
        },
        speed: {
          ru: 'Быстро',
          en: 'Fast'
        },
        other: {
          ru: 'Образует капли расплава, может самозатухать',
          en: 'Forms dripping melt, may self-extinguish'
        }
      }
    ]
  },

  tpu: {
    type: 'result',
    title: {
      ru: 'Термопластичный полиуретан (TPU)',
      en: 'Thermoplastic polyurethane (TPU)'
    },
    description: {
      ru: 'Эластичный материал с резиновым запахом при горении. Вспенённые TPU-материалы могут давать более сильный дым.',
      en: 'Elastic material with rubber-like odour when burning. Foamed TPU materials may generate more smoke.'
    },
    materials: [
      {
        name: {
          ru: 'TPU',
          en: 'TPU'
        },
        flame: {
          ru: 'Жёлтое пламя',
          en: 'Yellow flame'
        },
        odour: {
          ru: 'Сладковатый химический',
          en: 'Sweet chemical'
        },
        speed: {
          ru: 'Средняя',
          en: 'Medium'
        },
        other: {
          ru: 'Образует пузыри по фронту пламени',
          en: 'Shows bubbling at flame front'
        }
      }
    ]
  },

  pvc: {
    type: 'result',
    title: {
      ru: 'Поливинилхлорид (ПВХ)',
      en: 'Polyvinyl chloride (PVC)'
    },
    description: {
      ru: 'Виниловый полимер, плохо поддерживающий горение. Пластификаторы, наполнители и FR-пакеты могут сильно менять интенсивность дыма.',
      en: 'Vinyl polymer with poor flame propagation. Plasticisers, fillers and FR packages can greatly change smoke intensity.'
    },
    materials: [
      {
        name: {
          ru: 'ПВХ (жёсткий/мягкий)',
          en: 'PVC (rigid/flexible)'
        },
        flame: {
          ru: 'Жёлтое пламя с зеленоватым оттенком',
          en: 'Yellow flame with greenish tinge'
        },
        odour: {
          ru: 'Соляная кислота',
          en: 'Hydrochloric acid'
        },
        speed: {
          ru: 'Медленно, часто самозатухает',
          en: 'Slow, often self-extinguishing'
        },
        other: {
          ru: 'Белый едкий дым, тление по краю',
          en: 'White acrid smoke, edge smouldering'
        }
      }
    ]
  },

  self_ext_no_drips_odour: {
    type: 'question',
    title: {
      ru: 'Высокоогнестойкие инженерные термопласты',
      en: 'Highly flame-retarded engineering thermoplastics'
    },
    text: {
      ru: 'Какой запах сильнее всего выражен?',
      en: 'Which odour is most pronounced?'
    },
    description: {
      ru: 'PC, PSU, PPE и их FR-смеси могут давать пересекающиеся запахи и дым. Здесь мы лишь предлагаем наиболее близкую по поведению группу.',
      en: 'PC, PSU, PPE and their FR blends may overlap in odour and smoke. Here we only suggest the group with the closest behaviour.'
    },
    options: [
      {
        label: {
          ru: 'Слабо фенольный, полупрозрачные детали',
          en: 'Slightly phenolic, semi-transparent parts'
        },
        next: 'polysulphone'
      },
      {
        label: {
          ru: 'Фенол / «электротехника», ударопрочный прозрачный',
          en: 'Phenolic / “electrical”, tough transparent'
        },
        next: 'polycarbonate'
      },
      {
        label: {
          ru: 'Твёрдый матовый корпус, слабый запах',
          en: 'Hard matte housing, weak odour'
        },
        next: 'ppe'
      }
    ]
  },

  polysulphone: {
    type: 'result',
    title: {
      ru: 'Полисульфон',
      en: 'Polysulfone'
    },
    description: {
      ru: 'Высокотемпературный прозрачный инженерный пластик. Часто используется в виде FR-композиций.',
      en: 'High-temperature transparent engineering plastic. Often used as FR-compositions.'
    },
    materials: [
      {
        name: {
          ru: 'Полисульфон (PSU)',
          en: 'Polysulfone (PSU)'
        },
        flame: {
          ru: 'Тусклое жёлтое пламя',
          en: 'Dull yellow flame'
        },
        odour: {
          ru: 'Слабый фенольный',
          en: 'Weak phenolic'
        },
        speed: {
          ru: 'Медленно',
          en: 'Slow'
        },
        other: {
          ru: 'Детали полупрозрачные, выдерживают стерилизацию',
          en: 'Semi-transparent parts, steam-sterilisable'
        }
      }
    ]
  },

  polycarbonate: {
    type: 'result',
    title: {
      ru: 'Поликарбонат',
      en: 'Polycarbonate'
    },
    description: {
      ru: 'Прозрачный ударопрочный пластик. FR-марки для электроники могут почти не поддерживать пламя.',
      en: 'Transparent impact-resistant plastic. FR grades for electronics may barely support flame.'
    },
    materials: [
      {
        name: {
          ru: 'ПК (PC)',
          en: 'PC'
        },
        flame: {
          ru: 'Оранжево-жёлтое пламя',
          en: 'Orange-yellow flame'
        },
        odour: {
          ru: 'Фенольный',
          en: 'Phenolic'
        },
        speed: {
          ru: 'Медленно, может самозатухать',
          en: 'Slow, may self-extinguish'
        },
        other: {
          ru: 'Чёрный дым при длительном нагреве',
          en: 'Black smoke under prolonged heating'
        }
      }
    ]
  },

  ppe: {
    type: 'result',
    title: {
      ru: 'PPE / PPO',
      en: 'PPE / PPO'
    },
    description: {
      ru: 'Инженерный пластик для корпусов и электроники. Часто используется в смесях с FR-пакетами.',
      en: 'Engineering plastic for housings and electronics. Often used in blends with FR packages.'
    },
    materials: [
      {
        name: {
          ru: 'PPE (PPO)',
          en: 'PPE (PPO)'
        },
        flame: {
          ru: 'Тусклое жёлтое пламя',
          en: 'Dull yellow flame'
        },
        odour: {
          ru: 'Слабый химический',
          en: 'Weak chemical'
        },
        speed: {
          ru: 'Медленно',
          en: 'Slow'
        },
        other: {
          ru: 'Твёрдый матовый корпус, низкое влагопоглощение',
          en: 'Hard matte housings, low moisture uptake'
        }
      }
    ]
  },

  /* ---------------- THERMOSET / NON-SOFTENING BRANCH ---------------- */

  thermoset_burn: {
    type: 'question',
    title: {
      ru: 'Термореактивный / сильно сшитый пластик',
      en: 'Thermoset / highly crosslinked plastic'
    },
    text: {
      ru: 'При сжигании небольшого образца он самозатухает, продолжает гореть или вообще не горит?',
      en: 'When burning a small sample, does it self-extinguish, keep burning, or not burn at all?'
    },
    description: {
      ru: 'Эта ветка охватывает не только классические термореактивы, но и сильно сшитые TPE, а также очень огнестойкие термопласты. Результат всегда «наиболее вероятный сценарий», а не единственный возможный вариант.',
      en: 'This branch covers not only classical thermosets, but also highly crosslinked TPEs and very flame-retarded thermoplastics. The result is always “most likely scenario”, not the only possible option.'
    },
    media: {
      type: 'youtube',
      videoId: 'BhDma1-4iVc',
      controls: false,
      orientation: 'portrait',
      params: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    },
    options: [
      {
        label: {
          ru: 'Самозатухает и обугливается',
          en: 'Self-extinguishes and chars'
        },
        next: 'thermoset_self_smell'
      },
      {
        label: {
          ru: 'Продолжает гореть',
          en: 'Continues to burn'
        },
        next: 'thermoset_cont_smell'
      },
      {
        label: {
          ru: 'Вообще не горит, только белеет/усаживается',
          en: 'Does not burn at all, only whitens/shrinks'
        },
        next: 'no_flames_drips'
      }
    ]
  },

  thermoset_self_smell: {
    type: 'question',
    title: {
      ru: 'Самозатухающие термореактивные пластики',
      en: 'Self-extinguishing thermosets'
    },
    text: {
      ru: 'Какой запах вы ощущаете при нагреве?',
      en: 'What odour do you notice when heating?'
    },
    description: {
      ru: 'Меламиновые, фенольные и мочевинные смолы дают разные запахи, но в композитах (ДСП, ламинированные панели) картина может смешиваться.',
      en: 'Melamine, phenolic and urea resins have different odours, but in composites (particleboard, laminates) the picture may mix.'
    },
    options: [
      {
        label: {
          ru: 'Рыбный запах',
          en: 'Fish-like smell'
        },
        next: 'melamine'
      },
      {
        label: {
          ru: 'Фенольный запах',
          en: 'Phenolic odour'
        },
        next: 'phenol_formaldehyde'
      },
      {
        label: {
          ru: 'Резкий запах формальдегида',
          en: 'Sharp formaldehyde odour'
        },
        next: 'urea_formaldehyde'
      }
    ]
  },

  melamine: {
    type: 'result',
    title: {
      ru: 'Меламиноформальдегидная смола',
      en: 'Melamine formaldehyde'
    },
    description: {
      ru: 'Жёсткий термореакт, часто в посуде и ламинированных поверхностях. В плитных материалах смешивается с древесиной и клеями.',
      en: 'Hard thermoset used in dishware and laminates. In panel products it is mixed with wood and other binders.'
    },
    materials: [
      {
        name: {
          ru: 'Меламиноформальдегид (MF)',
          en: 'Melamine formaldehyde (MF)'
        },
        flame: {
          ru: 'Тусклое жёлтое пламя',
          en: 'Dull yellow flame'
        },
        odour: {
          ru: 'Рыбный',
          en: 'Fish-like'
        },
        speed: {
          ru: 'Самозатухает',
          en: 'Self-extinguishing'
        },
        other: {
          ru: 'Разбухает и трескается при нагреве',
          en: 'Swells and cracks on heating'
        }
      }
    ]
  },

  phenol_formaldehyde: {
    type: 'result',
    title: {
      ru: 'Фенолформальдегидная смола (бакелит)',
      en: 'Phenol formaldehyde (Bakelite)'
    },
    description: {
      ru: 'Классический бакелит для рукояток и электроарматуры. В армированных FR-композитах (например, FR-платы) вид горения меняется.',
      en: 'Classic bakelite for handles and electrical fittings. In reinforced FR composites (e.g. FR laminates) burn appearance changes.'
    },
    materials: [
      {
        name: {
          ru: 'Бакелит (PF)',
          en: 'Bakelite (PF)'
        },
        flame: {
          ru: 'Тусклое жёлтое пламя',
          en: 'Dull yellow flame'
        },
        odour: {
          ru: 'Фенол',
          en: 'Phenol'
        },
        speed: {
          ru: 'Самозатухает, может тлеть',
          en: 'Self-extinguishing, may smoulder'
        },
        other: {
          ru: 'Поверхность темнеет и обугливается',
          en: 'Surface darkens and chars'
        }
      }
    ]
  },

  urea_formaldehyde: {
    type: 'result',
    title: {
      ru: 'Мочевиноформальдегидная смола',
      en: 'Urea formaldehyde'
    },
    description: {
      ru: 'Дешёвый термореакт, чаще всего в виде связующего в ДСП/МДФ. Запах формальдегида может частично перекрываться запахом древесины.',
      en: 'Low-cost thermoset, mostly as binder in particleboard/MDF. Formaldehyde odour may partly overlap with wood smell.'
    },
    materials: [
      {
        name: {
          ru: 'Мочевиноформальдегид (UF)',
          en: 'Urea formaldehyde (UF)'
        },
        flame: {
          ru: 'Жёлтое пламя',
          en: 'Yellow flame'
        },
        odour: {
          ru: 'Формальдегид',
          en: 'Formaldehyde'
        },
        speed: {
          ru: 'Самозатухает',
          en: 'Self-extinguishing'
        },
        other: {
          ru: 'Разбухает и трескается при нагреве',
          en: 'Swells and cracks on heating'
        }
      }
    ]
  },

  thermoset_cont_smell: {
    type: 'question',
    title: {
      ru: 'Термореактивные, продолжающие гореть',
      en: 'Burning thermosets'
    },
    text: {
      ru: 'Материал продолжает гореть. Какой запах вы ощущаете?',
      en: 'The material keeps burning. What odour do you notice?'
    },
    description: {
      ru: 'UP, силиконы и эпоксидные композиты сильно зависят от типа наполнителей и армирования. Визуальная картина — только ориентир.',
      en: 'UP, silicones and epoxy composites strongly depend on fillers and reinforcement. Visual appearance is only a guide.'
    },
    media: {
      type: 'youtube',
      videoId: 'SYEvo5HGHps',
      controls: false,
      orientation: 'portrait',
      caption:   { ru: 'серый минеральный остаток', en: 'grey mineral residue' },
      
      params: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    },
    options: [
      {
        label: {
          ru: 'Рыбный запах, чёрный дым',
          en: 'Fish-like smell, black smoke'
        },
        next: 'unsaturated_polyester'
      },
      {
        label: {
          ru: 'Слабый запах, белый/серый минеральный остаток',
          en: 'Weak odour, white/grey mineral residue'
        },
        next: 'silicone'
      },
      {
        label: {
          ru: 'Резкий аминовый запах',
          en: 'Sharp amine odour'
        },
        next: 'epoxy'
      }
    ]
  },

  unsaturated_polyester: {
    type: 'result',
    title: {
      ru: 'Ненасыщенные полиэфирные смолы',
      en: 'Unsaturated polyester resins'
    },
    description: {
      ru: 'Основной связующий материал в стеклопластиках, лодках и кузовах. Тип армирования (стекло/уголь) меняет интенсивность дыма.',
      en: 'Main binder in fiberglass, boats and body panels. Type of reinforcement (glass/carbon) affects smoke intensity.'
    },
    materials: [
      {
        name: {
          ru: 'UP (стеклопластик)',
          en: 'UP (GRP)'
        },
        flame: {
          ru: 'Жёлтое пламя с голубыми краями',
          en: 'Yellow flame with blue edges'
        },
        odour: {
          ru: 'Рыбный (стирол)',
          en: 'Fish-like (styrene)'
        },
        speed: {
          ru: 'Продолжает гореть',
          en: 'Continues to burn'
        },
        other: {
          ru: 'Чёрный дым с сажей',
          en: 'Black sooty smoke'
        }
      }
    ]
  },

  silicone: {
    type: 'result',
    title: {
      ru: 'Силиконовые эластомеры',
      en: 'Silicone elastomers'
    },
    description: {
      ru: 'Эластичные термореакты, оставляющие минеральный остаток. Наполнители (Al2O3, SiO2 и др.) влияют на цвет и количество остатка.',
      en: 'Elastic thermosets leaving a mineral residue. Fillers (Al2O3, SiO2, etc.) affect colour and amount of residue.'
    },
    materials: [
      {
        name: {
          ru: 'Силикон RTV/HTV',
          en: 'Silicone RTV/HTV'
        },
        flame: {
          ru: 'Ярко-жёлтое пламя',
          en: 'Bright yellow flame'
        },
        odour: {
          ru: 'Слабый или невыраженный',
          en: 'Weak or faint'
        },
        speed: {
          ru: 'Может продолжать тлеть',
          en: 'May continue to smoulder'
        },
        other: {
          ru: 'Оставляет белый/серый минеральный остаток',
          en: 'Leaves white/grey mineral residue'
        }
      }
    ]
  },

  epoxy: {
    type: 'result',
    title: {
      ru: 'Эпоксидные смолы',
      en: 'Epoxy resins'
    },
    description: {
      ru: 'Жёсткий термореакт, широко используемый в композитах и электронике. В FR-печатных платах поведение ближе к сильно огнестойким материалам, чем к свободно горящим смолам.',
      en: 'Rigid thermoset widely used in composites and electronics. In FR printed circuit boards behaviour is closer to highly flame-retarded materials than to freely burning resins.'
    },
    materials: [
      {
        name: {
          ru: 'Эпоксидные композиты, платы',
          en: 'Epoxy composites, PCBs'
        },
        flame: {
          ru: 'Жёлтое пламя',
          en: 'Yellow flame'
        },
        odour: {
          ru: 'Резкий амин',
          en: 'Pungent amine'
        },
        speed: {
          ru: 'Продолжает гореть',
          en: 'Continues to burn'
        },
        other: {
          ru: 'Чёрный дым',
          en: 'Black smoke'
        }
      }
    ]
  }
};
