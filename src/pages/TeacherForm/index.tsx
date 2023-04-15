import React ,{useState, FormEvent}from 'react';
import {useHistory} from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/inputs';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import './styles.css';
import api from '../../services/api';


    
function TeacherForm()
{
   
     const history = useHistory();

     const [name,setName] = useState('');
     const [avatar,setAvatar] = useState('');
     const [whatsapp,setWhatsapp] = useState('');
     const [bio,setBio] = useState('');

     const [cost,setCost] = useState('');
     const [subject,setSubject] = useState('');



    const [scheduleItems, setScheduleItems] = useState([
        {week_day:0,from:'',to:'', }
    ]);
    
    function addNewScheduleItem()
    {
        setScheduleItems([
            ...scheduleItems,
        {week_day:0,from:'',to:'', }
        ])
    
        
    }
     
    function handlesCreateClass(e:FormEvent)
    {
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost:Number(cost),
            schedule:scheduleItems
        }).then(() =>{
            alert('cadastro realizado com sucesso');
            history.push('/');
        }).catch(() =>{
            alert('Erro no cadastro');
        })


  
    }

    function setScheduleItemValue(position:number,field: string,value:string)
    {
     const updateScheduleItems = scheduleItems.map((scheduleItems,index) =>{
         if(index === position)
         {
             return { ...scheduleItems,[field]:value};
         }
         return scheduleItems;
     })
     setScheduleItems(updateScheduleItems);
    }

    return (
        <div id="page-teacher-form" className="container">
           <PageHeader 
            title="que incrivel que voce quer dar aulas"
            description="O primeiro passo é preencher esse formulario de inscrição" 
           />
          
     <main>
        <form onSubmit={handlesCreateClass}>
             <fieldset>
                 <legend>Seus dados</legend>
                
                 <Input 
                 name="name" 
                 label="Nome completo" 
                 value={name} 
                 onChange={(e) =>{setName(e.target.value)}}
                 />

                 <Input 
                 name="avatar" 
                 label="Avatar"
                 value={avatar} 
                 onChange={(e) =>{setAvatar(e.target.value)}}
                 />

                 <Input 
                 name="Whatsapp"
                 label="Whatsapp"
                 value={whatsapp} 
                 onChange={(e) =>{setWhatsapp(e.target.value)}}
                />

                 <Textarea
                  name="bio" 
                  label="Biografia"
                  value={bio} 
                  onChange={(e) =>{setBio(e.target.value)}}
                  />
             </fieldset>

             <fieldset>
                 <legend>Sobre a aula</legend>
                
                 <Select 
                  name="subeject" 
                  label="Materia"
                  value={subject} 
                  onChange={(e) =>{setSubject(e.target.value)}}
                  options={[
                      { value:'Artes', label:'Artes'},
                      { value:'Biologia', label:'Biologia'},
                      { value:'Ciencia', label:'Ciencia'},
                      { value:'Ed/fisica', label:'Ed/fisica'},
                      { value:'Fisica', label:'fisica'},
                      { value:'Geografia', label:'Geografia'},
                      { value:'Historia:', label:'Historia'},
                      { value:'Portugues', label:'Portugues'},
                      { value:'Matematica', label:'Matematica'},
                      { value:'Quimica', label:'Quimica'},
                      { value:'Ingles', label:'Ingles'},
                  ]}
                 />

                 <Input 
                 name="cost" 
                 label="Custo / Hora"
                 value={cost} 
                 onChange={(e) =>{setCost(e.target.value)}}
                 />
                  
                  </fieldset>

                  <fieldset>

                    <legend>Horarios disponiveis
                     <button type="button" onClick={addNewScheduleItem} >
                        + Novo horario
                     </button>
                    </legend>

                {scheduleItems.map((scheduleItem,index) => {
                    return (
                        <div  key={scheduleItem.week_day} className="schedule-item">
                        <Select
                           name="week_day" 
                           label="Dia da semana"
                           value={scheduleItem.week_day}
                           onChange={e => setScheduleItemValue(index,'week_day', e.target.value)}
                           options={[
                           { value:'0', label:'Segunda-feira'},
                           { value:'1', label:'Terca-feira'},
                           { value:'2', label:'Quarta-feira'},
                           { value:'3', label:'Quinta-feira'},
                           { value:'4', label:'Sexta-feira'},
                           { value:'5', label:'Sabado'},
                           { value:'6', label:'Domingo'},
                           ]}
                        />
    
                         <Input
                          name="from"
                          label="Das" 
                          type="time" 
                          value={scheduleItem.from}
                          onChange={e => setScheduleItemValue(index,'from', e.target.value)}/>
                        
                         <Input 
                         name="to" 
                         label="Ate" 
                         type="time"
                         value={scheduleItem.to}
                         onChange={e => setScheduleItemValue(index,'to', e.target.value)} />
                         
                        </div>   
                    );
                })}
                   
                  </fieldset>
           

             <footer>
               <p>
                <img src={warningIcon} alt="Aviso importante"/>
                importante<br/>
                Preencha todos os dados
               </p>
               <button type="submit">
                   Salvar cadastro
               </button>
             </footer>
        </form>
    </main>
 </div>
    )
}
export default TeacherForm;