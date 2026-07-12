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
          ru: 'Этот шаг разделяет полиолефины (обычно легче воды) и остальные термопласты.',
          en: 'This separates lighter-than-water polyolefins from other thermoplastics.'
        },
        options: [
          {
            label: {
              ru: 'Плавает',
              en: 'Floats'
            },
            note: {
              ru: 'Полиолефины',
              en: 'Polyolefins'
            },
            next: 'polyolefins_smell'
          },
          {
            label: {
              ru: 'Тонет',
              en: 'Sinks'
            },
            note: {
              ru: 'Другие термопласты',
              en: 'All other thermoplastics'
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
          ru: 'Полиэтилен, полипропилен и TPX дают схожее пламя, поэтому запах и внешний вид образца помогают их отличить.',
          en: 'Polyethylene, polypropylene, and TPX show similar flames, so odour and specimen appearance help tell them apart.'
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
          ru: 'Типичный представитель плавающих полиолефинов.',
          en: 'Representative of floating polyolefins.'
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
              ru: 'Плавает в воде, образует горячие капли расплава',
              en: 'Floats in water, produces hot dripping melt'
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
          ru: 'Плавающий полиолефин с более высокой жёсткостью, чем PE.',
          en: 'Floating polyolefin with higher stiffness than PE.'
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
              ru: 'Образует горячие капли расплава, плавает в воде',
              en: 'Produces hot dripping melt, floats in water'
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
          ru: 'Прозрачный полиолефин с очень низкой плотностью и высоким Tm.',
          en: 'Transparent polyolefin with very low density and high Tm.'
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
          ru: 'Отсутствие устойчивого пламени характерно для фторополимеров и сильно огнестойких композиций.',
          en: 'Lack of stable flame is typical for fluoropolymers and highly flame-retarded compounds.'
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
          ru: 'Без пламени',
          en: 'No Flame'
        },
        text: {
          ru: 'Материал плавится и образует мягкие капли или нити?',
          en: 'Does the material melt and form soft drips or strings?'
        },
        description: {
          ru: 'Даже если пламени нет, поведение расплава подсказывает, какой именно фторполимер перед вами.',
          en: 'Even without a flame, melt behaviour hints at the specific fluoropolymer.'
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
          ru: 'Плавкий фторполимер с формированием нитей расплава.',
          en: 'More fusible fluoropolymer forming melt strings.'
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
          ru: 'Материал не поддерживает пламя и практически не плавится.',
          en: 'Does not sustain flame and barely melts.'
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
              ru: 'Характерный запах ABS / «LEGO»',
              en: 'Typical ABS / “LEGO” smell'
            },
            next: 'abs'
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
          ru: 'Стирольный термопласт, дающий густой чёрный дым.',
          en: 'Styrenic thermoplastic producing dense black smoke.'
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
          ru: 'Ударопрочные и модифицированные стирольные пластики.',
          en: 'Impact-modified styrenics.'
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
          ru: 'Ранние пластики на основе целлюлозы, сильно горючие.',
          en: 'Highly flammable early cellulose-based plastics.'
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
              ru: 'Горит почти мгновенно, чёрный дым',
              en: 'Can burn almost explosively, black smoke'
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
          ru: 'Ударопрочный стирольный пластик с характерным запахом.',
          en: 'Impact-resistant styrenic plastic with characteristic odour.'
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
        options: [
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
              ru: 'Чёрный дым, запах плавящейся ткани/резины',
              en: 'Black smoke, melting textile/rubber smell'
            },
            next: 'pet'
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
          ru: 'Прозрачный термопласт с чистым пламенем и малым дымом.',
          en: 'Transparent thermoplastic with clean flame and low smoke.'
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
          ru: 'Инженерный пластик с характерным запахом формальдегида.',
          en: 'Engineering plastic with formaldehyde odour.'
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
          ru: 'Полиэфир с характерным запахом плавящейся ткани.',
          en: 'Polyester with melting textile odour.'
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
          ru: 'Инженерный пластик, часто самозатухающий.',
          en: 'Engineering plastic, often self-extinguishing.'
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
          ru: 'Эластичный материал с резиновым запахом при горении.',
          en: 'Elastic material with rubber-like odour when burning.'
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
          ru: 'Виниловый полимер, плохо поддерживающий горение.',
          en: 'Vinyl polymer with poor flame propagation.'
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
          ru: 'Высокотемпературный прозрачный инженерный пластик.',
          en: 'High-temperature transparent engineering plastic.'
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
          ru: 'Прозрачный ударопрочный пластик.',
          en: 'Transparent impact-resistant plastic.'
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
          ru: 'Инженерный пластик для корпусов и электроники.',
          en: 'Engineering plastic for housings and electronics.'
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
          ru: 'Термореактивный пластик',
          en: 'Thermosetting Plastic'
        },
        text: {
          ru: 'При сжигании небольшого образца он самозатухает, продолжает гореть или вообще не горит?',
          en: 'When burning a small sample, does it self-extinguish, keep burning, or not burn at all?'
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
          ru: 'Жёсткий термореакт, часто в посуде и ламинированных поверхностях.',
          en: 'Hard thermoset used in dishware and laminates.'
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
          ru: 'Классический бакелит для рукояток, электроарматуры.',
          en: 'Classic bakelite for handles and electrical fittings.'
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
          ru: 'Дешёвый термореакт, часто как связующее в древесных плитах.',
          en: 'Low-cost thermoset, widely used as binder in wood panels.'
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
          ru: 'Основной связующий материал в стеклопластиках, лодках и кузовах.',
          en: 'Main binder in fiberglass, boats, and body panels.'
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
          ru: 'Эластичные термореакты с минеральным остатком.',
          en: 'Elastic thermosets leaving mineral residue.'
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
          ru: 'Жёсткий термореакт, широко используемый в композитах и электронике.',
          en: 'Rigid thermoset widely used in composites and electronics.'
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
