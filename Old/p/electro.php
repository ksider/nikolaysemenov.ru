<div class="page">
<div class="titel">
ПРОТОКОЛ ИСПЫТАНИЙ №{{num}}<br>
{{execut}}
</div>

<div class="data">   
<ol>
<li>Объект испытания: <strong>{{name}}</strong></li>
<li>Цель испытания: Определение комплекса физико-механических характеристик испытуемых образцов</li>
<li>Дата начала испытания: <strong>{{date_start}}</strong></li>
<li>Дата окончания испытания: <strong>{{date_end}}</strong></li>
<li>Место проведения испытания: Россия, Москва ул. Хованская, д. 6, лаборатория электроиспытаний «Сила тока»</li>
<li>Перечень средств измерений и испытательного оборудования:
    <ol>
        <li>Установка по определению электропроводности резины по ГОСТ 6433.2</li>
        <li>Лабораторный блок питания</li>
        <li>Вольтметр и амперметр</li>
    </ol>
</li>
<li>Количество образцов 10 шт.</li>
<li>Результаты испытания:
 <table cellspacing="0" cellpadding="0" border="1" class="pure-table">
    <tbody>
        <tr>
            <td>
                <p align="left">
                    Параметр
                </p>
            </td>
            <td>
                <p align="left">
                    Ед. Изм.
                </p>
            </td>
            <td>
                <p align="left">
                    Номинальное значение
                </p>
            </td>
            <td>
                <p align="left">
                    Предельное отклонение
                </p>
            </td>
            
            <td>
                <p align="left">
                    Измереннные значения
                </p>
            </td>            
            <td>
                <p align="left">
                    Средние измереннные значения
                </p>
            </td>
        </tr>
        
        <tr>
            <td>
                <p align="left">
                    Удельное объемное сопротивление
                </p>
            </td>
            <td>
                <p align="left">
                    кОм∙м
                </p>
            </td>
            <td>
                <p align="left">
                    {{dev_uvr}}
                </p>
            </td>
            
            <td width="139">
                <p align="left">
                    {{dev_du}}
                </p>
            </td>
            
            <td width="61">
 <div class="row">
{{#raw_uvr}}
<div class="col-xs-6"><span>{{.}};</span></div> 
{{/raw_uvr}}
 </div>           
 
         </td>
                    
<td width="100">           
  <p align="left">{{uvr}}</p>
</td>
       
        </tr>
        
        <tr>
            <td width="137">
                <p align="left">
                    Удельное контактное сопротивление
                </p>
            </td>
            <td width="82">
                <p align="left">
                    кОм∙м
                </p>
            </td>
            <td width="123">
                <p align="left">
                    {{dev_ucr}}
                </p>
            </td>
            <td width="139">
                <p align="left">
                    {{dev_du}}
                </p>
            </td>
            
           <td width="61">
{{#raw_ucr}}
<span>{{.}};</span> 
{{/raw_ucr}}
           
            </td>
            
            <td width="100">
                <p align="left">
                    {{ucr}}
                </p>
            </td>
        </tr>
      
    </tbody>
</table>    
</li>

<li>Замечания и рекомендации: Замечаний и рекомендаций нет</li>

<li>Выводы:
<ul>
<li>Объект испытания был исследован в соотвествии с {{pim}}.</li>
<li>{{accept}}</li>
</ul>
</li>
</ol>
</div>
  
  <div class="sighn">
Исполнители: <br>
Головин С.В.<br>
Чадин В.Н. <br>

{{date_end}}<br>
  </div>
</div> 