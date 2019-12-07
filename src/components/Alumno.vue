<template>
    <v-app>
        <div>
           <v-toolbar
      green
      prominent
      src="@/assets/sere.gif"
    >
      <v-toolbar-title class="white--text">Alumnos</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="600px" >
                        <template v-slot:activator="{ on }">
                            <v-btn color="#212121" class="white--text" v-on="on">Registrar</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">Registro</span>
                            <v-spacer></v-spacer>
                            <v-btn  class="red--text" text @click="dialog = false">X</v-btn>
                            </v-card-title>
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex xs12 >
                                    <v-text-field 
                                    label="Nombre" 
                                    color="#26A69A" 
                                    autofocus
                                    v-model="nombre"
                                    v-validate="'required'"
                                    required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field 
                                    label="Apellidos" 
                                    color="#26A69A" 
                                    v-model="apellidos"
                                    v-validate="'required'"
                                    required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 >
                                    <v-text-field
                                    label="Direccion" 
                                    color="#26A69A"    
                                    v-model="direccion" 
                                    v-validate="'required'"                        
                                    required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field 
                                    label="Sexo"
                                    color="#26A69A" 
                                    v-model="sexo"
                                    type="email"
                                    v-validate="'required'" 
                                    required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field 
                                    label="Edad" 
                                    color="#26A69A" 
                                    v-model="edad"
                                    v-validate="'required'"
                                    required                                    
                                    @keypress="isNumber($event)"
                                    ></v-text-field>
                                </v-flex>                          
                                <v-flex xs12 >
                                    <v-text-field
                                    label="Carrera"
                                    color="#26A69A" 
                                    item-text="nombre"
                                    item-value="nombre"
                                    v-model="carrera"
                                    required
                                    v-validate="'required'"
                                            ></v-text-field>
                                </v-flex>
                                </v-layout>
                            </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            
                            <v-btn color="#5C6BC0" text @click="submit">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>  
    </v-toolbar>
        <br>
        <div class="container">
            <v-card>
                <v-card-actions>         
                    <v-spacer></v-spacer>
                    <!-- Dialogo Alumno -->
                
                                       
                </v-card-actions>
                <br>
                
                <div class="container">
                    <h2 class="blue-grey--text">Filtros</h2>
                    <v-row justify="space-around">
                    <v-checkbox
                    v-model="selccion"
                    :label="`Nombre`"   
                    type="radio" id="one"     
                    value="uno"           
                    ></v-checkbox>
                    <v-checkbox
                        v-model="selccion"
                        :label="`Carrera`"  
                        type="radio" id="dos"
                        value="dos"                 
                    ></v-checkbox>
                    <v-checkbox
                        v-model="selccion"
                        :label="`Edad`"    
                        type="radio" id="tres"    
                        value="tres"           
                    ></v-checkbox>
                    </v-row>
                    
                    
                </div>
                
                <v-container>
                <v-card-title>Registros
                <v-spacer></v-spacer>
                <v-text-field 
                    label="Buscar..." 
                    v-model="filtro"
                    single-line
                    hide-details
                    ></v-text-field>
                    </v-card-title>
                </v-container>
                
                <v-simple-table>
                    <thead>
                    <tr>
                        <th class="text-left">Nombre</th>
                        <th class="text-left">Apellidos</th>
                        <th class="text-left">Edad</th>
                        <th class="text-left">Sexo</th>
                        <th class="text-left">Direccion</th>
                        <th class="text-left">Carrera</th>
                        <th class="text-left">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in filtros" :key="item.id" >
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.apellidos }}</td>
                        <td>{{ item.edad }}</td>
                        <td>{{ item.sexo }}</td>
                        <td>{{ item.direccion }}</td>
                        <td>{{ item.carrera }}</td>
                        <td>
                            <!-- Dialogo Alumno Actualizar-->
                            <v-dialog v-model="dialog2" persistent max-width="600px" >
                                <template v-slot:activator="{ on }">                          
                                    <v-btn text color="#7986CB" v-on="on" @click="getAlumno(item.id)" dark >Actualizar</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                    <span class="headline">Actualización</span>
                                    <v-spacer></v-spacer>
                                    <v-btn class="red--text" text @click="dialog2 = false">X</v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                        <v-flex xs12 >
                                            <v-text-field 
                                            label="Nombre" 
                                            color="#26A69A" 
                                            autofocus
                                            v-model="nombre_db"
                                            v-validate="'required'"
                                            required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field 
                                            label="Apellidos"
                                            color="#26A69A"  
                                            v-model="apellidos_db"
                                            v-validate="'required'"
                                            required>
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field
                                            label="Direccion"
                                            color="#26A69A"     
                                            v-model="direccion_db" 
                                            v-validate="'required'"                        
                                            required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field 
                                            label="Sexo"
                                            color="#26A69A" 
                                            v-model="sexo_db"
                                            type="email"
                                            v-validate="'required'" 
                                            required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field 
                                            label="Edad"
                                            color="#26A69A"  
                                            v-model="edad_db"
                                            v-validate="'required'"
                                            required                                    
                                            @keypress="isNumber($event)"
                                            ></v-text-field>
                                        </v-flex>                          
                                        <v-flex xs12>
                                            <v-text-field
                                            label="Carrera"
                                            color="#26A69A" 
                                            v-model="carrera_db"
                                            required
                                            v-validate="'required'"
                                            ></v-text-field>
                                        </v-flex>
                                        </v-layout>
                                    </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    
                                    <v-btn color="#5C6BC0"  text @click="actualizar(item.id)">Actualizar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>  
                            <!-- Dialogo Alumno Actualizar -->
                            <v-btn text color="#E53935" dark @click="eliminar(item.id)">Eliminar</v-btn> 
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>                
                
                
            </v-card>
        </div>
        </div>
    </v-app>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate';
import { API } from '../Servicios/axios';


 Vue.use(VeeValidate);

  export default {
    data () {
      return {
          $_veeValidate: {
        validator: 'new',
        iconfont: 'fa'
        },
        
        token:"",
        
        nombre:"",
        apellidos:"",
        edad:"",
        sexo:"",
        direccion:"",
        carrera:"",
        
        

        alumnos:[],
        id_alumno:[],
        alumno_select:0,

        nombre_db:"",
        apellidos_db:"",
        edad_db:"",
        sexo_db:"",
        direccion_db:"",
        carrera_db:"",
        carrera_db2:[],
        
        filtro:"",
        selccion: '',
        selccion2:false,
        selccion3: false,
        dialog: false,
        dialog2: false,

       

        //alumnos: ['Foo', 'Bar', 'Fizz', 'Buzz'],

       // materias:['IDS','MECATRONICA','BIOMEDICA','AGRO'],

        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'id',
          },
          { text: 'Alumno id', value: 'alumno_id' },
          { text: 'Horario id', value: 'horario_id' },         
          { text: 'Fecha', value: 'fecha' }          
        ],
        desserts: [],
        materias_alumno:[],
        data_alumno:[]
      }
    },
    filters:{
        
    },
    computed:{
        filtros:function(){    
            var self=this;  
            if(!this.filtro.length){
                return this.alumnos
            }else{
                return this.alumnos.filter((alumno) =>{            
                    if (this.selccion == 'uno'){
                        return alumno.nombre.match(self.filtro) 
                    }else if(this.selccion == 'dos'){
                        return alumno.carrera.match(self.filtro)
                    }else if(this.selccion == 'tres') {
                        return alumno.edad.toString().match(parseInt(self.filtro))                       
                    }
                                             
                
                })
            }
                 
            
            // .filter((alumno)=>{                              
            //     return alumno.edad.match(self.filtro)           
            // })
            // .filter((alumno) =>{                              
            //     return alumno.carrera.match(self.filtro)               
            // })
            
        }
    },
    mounted() {
        
        // try {
        //     this.socket.on('rfid_frontend', (data) => {
        //     console.log(data)
        //     this.rfid = data;
        //     // you can also do this.messages.push(data)
        // });
        // } catch (error) {
        //     console.log(error)
        // }
        
    },
    created(){       
        this.token=this.$route.query.token
        //console.log('tokenc'+this.$route.query.token)
        this.getAlumnos()
        this.getAsignaturas()
    },
    methods: {
        submit () {        
        this.$validator.validateAll().then(valid =>{
            if(valid){
                API({
                    method: 'post',
                    url: 'alumno/alumno_lista/',
                    headers: {
                    Authorization: 'Token '+ this.token,
                    },
                    data: {
                        nombre: this.nombre,  
                        apellidos: this.apellidos,
                        direccion: this.direccion,
                        sexo:this.sexo,
                        edad:this.edad,                         
                        carrera:this.carrera  
                    }
                });     
                this.getAlumnos();            
                this.dialog = false;                              
                this.clean();
                this.getAlumnos() 
                                        
            }            
        })
        },
        actualizar (id) {    
            this.$validator.validateAll().then(valid =>{
                if(valid){ 
                    API({
                    method:'put',
                    url:('alumno/alumno_detalle/' + id),
                    headers: {
                            Authorization:  'Token '+ this.token,
                    },
                    data: {
                        nombre: this.nombre_db,  
                        apellidos: this.apellidos_db,
                        direccion: this.direccion_db,
                        sexo:this.sexo_db,
                        edad:this.edad_db,                         
                        carrera:this.carrera_db  
                    }
                    }).then(function () {
                        //console.log(response);
                        
                    })                                                          
                    this.dialog2 = false;               
                    this.$validator.reset() 
                    this.getAlumnos()   
                    this.getAlumnos()                     
                }            
            })
        },
        eliminar(id){
            API({
              method:'delete',
              url:('alumno/alumno_detalle/' + id),
              headers: {
                    Authorization: 'Token '+ this.token,
                },
            }).then(function () {
                //console.log(response);
                
            })
            this.getAlumnos()
            this.getAlumnos() 
            //this.$router.go()
        },
        clean(){
            this.nombre="",
            this.apellidos="",
            this.direccion="",
            this.sexo="",
            this.edad = "",            
            this.carrera = "",
            this.$validator.reset()          
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },

        getAlumnos(){
            API.get('alumno/alumno_lista/',{
                headers: {
                    Authorization: 'Token '+ this.token,
                }
            })
            .then((response)=>{                
                this.alumnos = response.data    
                //console.log(response)              
            })            
        },

        getAsignaturas(){
            API.get('alumno/asignaturas/',{
                headers: {
                    Authorization: 'Token '+ this.token,
                }
            })
            .then((response)=>{                
                this.materias = response.data               
                //console.log(response)   
            })            
        },

        getAlumno(id){            
            API.get('alumno/alumno_detalle/' + id,{
                headers: {
                    Authorization: 'Token '+ this.token,
                },
            })
            .then((response)=>{ 
                //console.log(response)                            
                this.nombre_db = response.data.nombre ,
                this.apellidos_db= response.data.apellidos ,
                this.edad_db= response.data.edad ,
                this.sexo_db= response.data.sexo ,
                this.direccion_db= response.data.direccion,                
                this.carrera_db= response.data.carrera
                 

            }) 
               
        },

    }
  }
</script>