import React, { useState, FormEvent } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader';
import TeacherItem,{Teacher} from '../../components/TeacherItem';
import Input from '../../components/inputs';
import Select from '../../components/Select';
import api from '../../services/api';




function TeacherList()
{
 const [subject, setSubject] = useState('');
 const [week_day, setWeekDay] = useState('');
 const [time, setTime] = useState('');

 async function searchTeachers(e: FormEvent)
{
 e.preventDefault();

const response = await api.get('classes',{
   params:{
     subject,
     week_day,
     time,
   }
 })
setTeachers(response.data);
}


const [teachers,setTeachers] = useState([])

    return(
        <div id="page-teacher-list" className="container">
         <PageHeader title="Estes são os proffys disponiveis.">
           <form id="search-teachers" onSubmit={searchTeachers}>
            
         <Select 
          name="subeject" 
          label="Materia"
          value={subject}
          onChange={(e) => { setSubject(e.target.value)}}
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

        <Select
         name="week_day" 
         label="Dia da semana"
         value={week_day}
         onChange={(e) => {setWeekDay(e.target.value)}}
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
            type="time" 
            name="time" 
            label="Hora"
            value={time}
            onChange={(e) => { setTime(e.target.value)
            }}
           />
              <button type="submit">Buscar</button>
           </form>
         </PageHeader>
         <main>
          {teachers.map((teacher:Teacher) => {
            return  <TeacherItem key={teacher.id} teacher={teacher}/>
          })}
          
         </main>
        </div>
    )
}
export default TeacherList;