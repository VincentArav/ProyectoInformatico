const {Client} = require('pg');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const client = new Client({
    user: 'ldelafuente',
    host: 'plop.inf.udec.cl',
    database: 'ldelafuente',
    password: 'G5fz6TnPNfnut5G',
})

client.connect(function(error){
    if(error){
        mensaje = "No me pude conectar" + error;
        console.error(mensaje);
        client.end();
    }
    console.log("Conectado");
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/****Consultas*****/
/* Login */
app.post('/login', bodyParser.json(),(req,res)=>{
    var rut=req.body.rut_usuario
    var contrasena=req.body.contrasena_login
    const select_query= `SELECT * FROM usuarios WHERE rut_usuario=$1 AND password_usuario=$2`;
    client.query(select_query,[rut, contrasena],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Error');
        }else{
            res.json({
                data: result
            })
        }
    });
});

/* Login Area de Gestion*/
app.post('/login_adm', bodyParser.json(),(req,res)=>{
    var rut=req.body.rut_usuario
    var contrasena=req.body.contrasena_login
    const select_query= `SELECT * FROM usuarios WHERE rut_usuario=$1 AND password_usuario=$2`;
    client.query(select_query,[rut, contrasena],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Error');
        }else{
            res.json({
                data: result
            })
        }
    });
});

/* Añadir Material */
app.post('/ADDMaterial/:id',bodyParser.json(),(req,res)=>{ 
    var id = req.params.id;
    const select_query=`INSERT INTO material (nombre, descripcion)
    VALUES ('${req.body.nombre_r}','${req.body.descripcion_r}') ON CONFLICT DO NOTHING `; 
    client.query(select_query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('blablsl');
        }else{
            console.log(select_query);
            //console.log(result);
            return res.json(res.body);
        }
    });
});  



/* Desing */
app.get('/nombreUsuario/:id',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT UPPER(nombre_usuario) as nombre_usuario, UPPER(apellido_usuario) as apellido_usuario FROM usuarios M WHERE M.rut_usuario=$1`;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log(result);
            return res.json({
                data: result
            })
        }
    });
});

/* Desing Admin */
app.get('/datosUser/:id',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT UPPER(nombre_usuario) as nombre_usuario, UPPER(apellido_usuario) as apellido_usuario FROM usuarios M WHERE M.rut_usuario=$1`;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log(result);
            return res.json({
                data: result
            })
        }
    });
});
/* Solicitud */
app.get('/ListadoMateriales',(req,res)=>{ 
    var id = req.params.id;
    const select_query=`SELECT * FROM material`;
    client.query(select_query,(err,result)=>{
        console.log(result);
      if(err){
          return res.send(err)
      }else{
          console.log(select_query);
          console.log(result);          
          return res.json({
              data: result.rows
          })
      }
  });
});
app.get('/ListadoLugares',(req,res)=>{ 
    var id = req.params.id;
    const select_query=`SELECT * FROM destino`;
    client.query(select_query,(err,result)=>{
        console.log(result);
      if(err){
          return res.send(err)
      }else{
          console.log(select_query);
          console.log(result);          
          return res.json({
              data: result.rows
          })
      }
  });
});
app.post('/ADDSolicitud/',bodyParser.json(),(req,res)=>{

    let datos = req.body;
    let rut = datos.rut;
    let cantidad = datos.cantidad;
    let materiales = datos.materiales;
    let destino = datos.destino;
    let especificaciones = datos.especificaciones;
    let comentario = datos.comentario_orden;

    const post_query=`INSERT INTO orden (etapa, creador, destino, comentario)
    VALUES (1, '${rut}','${destino}', '${comentario}') RETURNING id`;
    client.query(post_query,(err,result)=>{
        console.log(typeof(cantidad))
        if(err){
            console.log(err);
            res.status(500).send('Error');  
        }else{
            // return res.json({
            //     data : result.rows[0].id
            // })
            for (let i=0; i<cantidad.length; i++){
                
                const post_query2=`INSERT INTO contiene (orden, material, cantidad, comentario)
                            VALUES ('${result.rows[0].id}', '${materiales[i]}', '${cantidad[i]}', '${especificaciones[i]}')`;
            
            client.query(post_query2, (err, result2)=>{
                if(err) {
                    console.log("error en contiene");
                } else {
                    if(i === materiales.length - 1){
                        return res.json({
                            data : result2
                        })
                    }
                    // return res.json({
                    //     data : result2
                    // })
                }
            })}

       }
   });    
});

/* Aprobar solicitud */
app.get('/ordenes',(req,res)=>{//REVISAR TRATAMIENTO 
    const select_query2=`SELECT orden.id, usuarios.nombre_usuario, usuarios.apellido_usuario FROM orden JOIN usuarios ON orden.creador = usuarios.rut_usuario WHERE orden.etapa = 1`;//este parametro no lo esta leyendo bien
    client.query(select_query2,(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("HOLI")
        //console.log(result);
        if(err){
            return res.send(err)
        }else{
            console.log(select_query2);
            console.log(result);            
            return res.json({
                data: result
            })
        }  
    });
});

app.get('/ListadoMateriales/:id',(req,res)=>{
    var id =req.params.id;
    console.log(id);
    const select_query2 =`SELECT orden.id, to_char(orden.fecha,'YYYY-MM-DD') as fecha, usuarios.nombre_usuario, 
    usuarios.apellido_usuario, material.nombre, contiene.cantidad, contiene.comentario FROM orden JOIN usuarios ON orden.creador = usuarios.rut_usuario
    JOIN contiene ON orden.id = contiene.orden JOIN material ON contiene.material = material.id WHERE orden.id = $1;`
    client.query(select_query2,[id],(err,result)=>{
          console.log(result);
        if(err){
            return res.send(err)
        }else{
           console.log(select_query2);
            console.log(result);  
                     
            return res.json({
                data: result.rows
            })
        }
    });
});

app.post('/Aprobar',bodyParser.json(),(req,res)=>{//dar-alta-medica
    var id=req.params.id;
    const select_query1=`UPDATE orden SET etapa = 2 WHERE id = '${req.body.id_orden}';`//este parametro no lo esta leyendo bien
    client.query(select_query1,(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("Listado Pacientes")
        console.log(result);
        if(err){
            return res.send(err)
            console.log("HAY UN ERROR")
        }else{
            console.log(result);
            return res.json({
                data: result
        })
        } 
    });
    console.log("RETURN");
});

app.post('/Rechazar',bodyParser.json(),(req,res)=>{//dar-alta-medica
    var id=req.params.id;
    const select_query1=`UPDATE orden SET etapa = 3 WHERE id = '${req.body.id_orden}';`//este parametro no lo esta leyendo bien
    client.query(select_query1,(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("Listado Pacientes")
        console.log(result);
        if(err){
            return res.send(err)
            console.log("HAY UN ERROR")
        }else{
            console.log(result);
            return res.json({
                data: result
        })
        } 
    });
    console.log("RETURN");
});





































/* LEO */
/*********** REVISARTRAT-MED **************/
app.get('/datPacM/:id',(req,res)=>{//REVISAR TRATAMIENTO 
    var id = req.param('id_p');
    var id_m = req.param('id');
    console.log(req.param);
    console.log(id);
    const select_query2=`SELECT to_char(P.fecha_termino,'YYYY-MM-DD') as fecha_receta, P.nombre_medicamento, P.hora_medicamento, P.dosis_medicamento, paciente.nombre_paciente, paciente.apellido_paciente, receta_medica.descripcion_receta, receta_medica.estado_receta, medico.nombre_medico, medico.apellido_medico FROM paciente_medicamento P,medico JOIN receta_medica ON medico.rut_medico = receta_medica.rut_medico JOIN paciente ON receta_medica.rut_paciente = paciente.rut_paciente WHERE paciente.rut_paciente = $1 AND receta_medica.fecha_termino > current_timestamp AND receta_medica.rut_paciente = P.rut_paciente`;//este parametro no lo esta leyendo bien
    client.query(select_query2,[id],(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("HOLI")
        //console.log(result);
        if(err){
            return res.send(err)
        }else{
            console.log(select_query2);
            console.log(result);            
            return res.json({
                data: result.rows
            })
        }  
    });
});
app.get('/Pacientes/:id',(req,res)=>{//REVISAR TRATAMIENTO - MUESTRA LOS RUTS
    var id = req.param('id');
    //console.log(req.param);
    console.log("PACIENTE ID")
    console.log(id);
    const select_query2=`SELECT rut_paciente FROM receta_medica WHERE rut_medico = $1 AND fecha_termino >= current_timestamp`;//este parametro no lo esta leyendo bien
    client.query(select_query2,[id],(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("Listado Pacientes")
        console.log(result);
        if(err){
            return res.send(err)
            console.log("HAY UN ERROR")
        }else{
            console.log(select_query2);
            console.log(result);            
            return res.json({
                data: result
            })
        }
    });
});
/*********** REGISTRO-TRAT **************/
app.post('/datPacPOST/:id',bodyParser.json(),(req,res)=>{ //REGISTRAR TRATAMIENTO
     var id = req.params.id;
     const select_query=`INSERT INTO receta_medica (rut_medico, rut_paciente, descripcion_receta, fecha_receta, medicamento_receta, fecha_termino)
     VALUES ($1,'${req.body.id_p}','${req.body.descripcion_r}','${req.body.fecha_r}', '${req.body.medicamento_r}', '${req.body.fecha_t}') ON CONFLICT DO NOTHING `; 
     client.query(select_query,[id],(err,result)=>{
         if(err){
             console.log(err);
             res.status(500).send('blablsl');
         }else{
            const select_query2= `INSERT INTO paciente_medicamento (rut_paciente, nombre_medicamento, hora_medicamento, dosis_medicamento, fecha_termino) 
            VALUES('${req.body.id_p}','${req.body.medicamento_r}','${req.body.hora_m}', '${req.body.hora_m}','${req.body.fecha_t}') ON CONFLICT DO NOTHING `;//este parametro no lo esta leyendo bien
            client.query(select_query2,(err,result)=>{
                if(err){
                    console.log("rut");
                    console.log(req.body.id_p);
                    console.log("hora");
                    console.log(req.body.hora_m);
                    console.log("dosis");
                    console.log(req.body.dosis_m);

                    console.log("NO HIZO LA SEGUNDA INSERT");
                    console.log(err);
                    return res.send(err)
                }else{
                    console.log("SE HIZO LA SEGUNDA INSERT");
                    console.log(result);
                    return res.json({
                        data: result
                    })
                }
            });
            console.log("SE HIZO LA SEGUNDA INSERT");
            console.log(result);
        }
    });    
 });
 app.get('/rutDeLosPacientes/:id',(req,res)=>{ //REGISTRAR TRATAMIENTO - MUESTRA LOS RUT
    var id = req.params.id;
    const select_query=`SELECT distinct rut_paciente FROM hospitalizacion_domiciliaria WHERE rut_medico = $1 AND estado_hospitalizacion = 'Internado'`;
    client.query(select_query,[id],(err,result)=>{
        console.log(result);
      if(err){
          return res.send(err)
      }else{
          console.log(select_query);
          console.log(result);          
          return res.json({
              data: result.rows
          })
      }
  });
});
app.post('/reg_med/:id',bodyParser.json(),(req,res)=>{ //REGISTRAR TRATAMIENTO - INGRESAR EL MEDICAMENTO
    var id = req.params.id;
    const select_query=`INSERT INTO hospitalizacion_domiciliaria (rut_medico, fecha_hospitalizacion, descripcion_hospitalizacion, rut_paciente, gravedad_hospitalizacion)
    VALUES ($1,'${req.body.fecha_hospitalizacion}','${req.body.estado_hospitalizacion}','${req.body.rut_paciente}','${req.body.gravedad_hospitalizacion}') ON CONFLICT DO NOTHING `; 
    client.query(select_query,[id],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('blablsl');
        }else{
            console.log(select_query);
            //console.log(result);
            return res.json(res.body);
        }
    });
});  
/*********** INGRESAR-HOSP **************/
app.post('/reg_hosp/:id',bodyParser.json(),(req,res)=>{ //INGRESAR HOSPITALIZACION 
    var id = req.params.id;
    const select_query=`INSERT INTO hospitalizacion_domiciliaria (rut_medico, fecha_hospitalizacion, descripcion_hospitalizacion, rut_paciente, gravedad_hospitalizacion)
    VALUES ($1,'${req.body.fecha_hospitalizacion}','${req.body.estado_hospitalizacion}','${req.body.rut_paciente}','${req.body.gravedad_hospitalizacion}') ON CONFLICT DO NOTHING `; 
    client.query(select_query,[id],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('blablsl');
        }else{

            console.log(select_query);
            //console.log(result);
            return res.json(res.body);
        }
    });
});      
app.get('/PoderHospitalizacion',(req,res)=>{//INGRESAR HOSPITALIZACION- MUESTRA LOS RUT QUE PUEDEN INGRESAR UNA HOSPITALIZACION
    var id = req.param.id
    console.log(req.param);
    console.log(id);
    const select_query2=`SELECT paciente.rut_paciente FROM paciente WHERE paciente.rut_paciente NOT IN (SELECT hospitalizacion_domiciliaria.rut_paciente FROM hospitalizacion_domiciliaria WHERE hospitalizacion_domiciliaria.estado_hospitalizacion = 'Internado')`;//este parametro no lo esta leyendo bien
    client.query(select_query2,(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("HOLI")
        //console.log(result);
        if(err){
            return res.send(err)
        }else{
            console.log(select_query2);
            //console.log(result);            
            return res.json({
                data: result.rows
            })
        }
    });
});

app.get('/ListadoMedicamentos',(req,res)=>{//INGRESAR HOSPITALIZACION- MUESTRA EL LISTADO DE MEDICAMENTOS
    var id = req.param.id
    console.log(req.param);
    console.log(id);
    const select_query2=`SELECT distinct medicamento.hora_medicamento, medicamento.nombre_medicamento FROM medicamento WHERE NOT medicamento.nombre_medicamento = 'Sin medicamento' ORDER BY hora_medicamento ASC`;//este parametro no lo esta leyendo bien
    client.query(select_query2,(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("HOLI")
        //console.log(result);
        if(err){
            return res.send(err)
        }else{
            console.log(select_query2);
            //console.log(result);            
            return res.json({
                data: result.rows
            })
        }
    });
});
/******** Alta Medica *****************/
app.post('/AltaMedica',bodyParser.json(),(req,res)=>{//dar-alta-medica
    var id=req.params.id;
    //console.log(req.param);
    //console.log(id);
    const select_query1=`UPDATE hospitalizacion_domiciliaria SET estado_hospitalizacion = 'Alta', fecha_alta ='${req.body.fecha_r}' WHERE rut_paciente = '${req.body.input_rut}' AND estado_hospitalizacion = 'Internado';`//este parametro no lo esta leyendo bien
    client.query(select_query1,(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("Listado Pacientes")
        console.log(result);
        if(err){
            return res.send(err)
            console.log("HAY UN ERROR")
        }else{
            const select_query2= `UPDATE receta_medica SET estado_receta = false, fecha_termino = current_timestamp WHERE rut_paciente = '${req.body.input_rut}';`//este parametro no lo esta leyendo bien
            client.query(select_query2,(err,result)=>{
                if(err){
                    return res.send(err)
                }else{
                    const select_query = `UPDATE paciente_medicamento SET fecha_termino = current_timestamp WHERE rut_paciente = '${req.body.input_rut}';`
                    if(err){
                        return res.send(err)
                    }else{
                        console.log(result);
                    return res.json({
                        data: result
                    })
                    }                    
                }
            });
        }
    });
    console.log("RETURN");
});
/******** Añadir Medicamento ************/
app.get('/PacienteMedicamento/:id',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT to_char(receta_medica.fecha_receta,'YYYY-MM-DD') as fecha_receta, to_char(receta_medica.fecha_termino, 'YYYY-MM-DD') as fecha_termino, receta_medica.descripcion_receta, receta_medica.rut_paciente, paciente.nombre_paciente, paciente.apellido_paciente
    FROM receta_medica, paciente
    WHERE receta_medica.rut_paciente = paciente.rut_paciente AND receta_medica.fecha_termino > current_timestamp AND receta_medica.rut_medico = $1`;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log(select_query);
            //console.log(result);
            return res.json({
                data: result
            })
        }
    });
});
app.get('/PacienteMedicamentoRUT/:id',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT receta_medica.rut_paciente
    FROM receta_medica, paciente
    WHERE receta_medica.rut_paciente = paciente.rut_paciente AND receta_medica.fecha_termino > current_timestamp AND receta_medica.rut_medico = $1`;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log("PACIENTEMEDICAMENTORUT");
            console.log(result);
            console.log(select_query);
            //console.log(result);
            return res.json({
                data: result.rows
            })
        }
    });
});

app.get('/HorasMed',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT distinct medicamento.hora_medicamento FROM medicamento WHERE NOT medicamento.nombre_medicamento = 'Sin medicamento' ORDER BY medicamento.hora_medicamento ASC`;
    
    client.query(select_query,(err,result)=>{
        if(err){
            console.log("HorasMed");
            console.log(err);
            return res.send(err)
        }else{
            console.log("HorasMed");
            console.log(result);
            console.log(select_query);
            //console.log(result);
            return res.json({
                data: result.rows
            })
        }
    });
});
app.post('/ADDMEDICAMENTO/:id',bodyParser.json(),(req,res)=>{ //
    var id = req.params.id;
    const select_query2= `INSERT INTO paciente_medicamento (rut_paciente, nombre_medicamento, hora_medicamento, dosis_medicamento, fecha_termino) 
    VALUES('${req.body.id_p}','${req.body.medicamento_r}','${req.body.hora_m}', '${req.body.dosis_m}','${req.body.fecha_t}') ON CONFLICT DO NOTHING `;//este parametro no lo esta leyendo bien
    client.query(select_query2,(err,result)=>{
        if(err){
            console.log("NO HIZO LA SEGUNDA INSERT");
            return res.send(err)
        }else{
            console.log("SE HIZO LA SEGUNDA INSERT");
            console.log(result);
            return res.json({
                data: result
            })
        }
    });
});
/********  CONSULTAS CHAFAS ***********/
app.get('/Pac-tratamientos/:id',(req,res)=>{//PACIENTE
    var id=req.params.id;
    //console.log(req.param);
    //console.log(id);
    const select_query2=`SELECT medicamento_receta, descripcion_receta, estado_receta, to_char(fecha_receta,'YYYY-MM-DD') FROM receta_medica WHERE rut_paciente = $1`;//este parametro no lo esta leyendo bien
    client.query(select_query2,[id],(err,result)=>{ //al dejar id, le estoy pasando el valor
        console.log("Listado Pacientes")
        console.log(result);
        if(err){
            return res.send(err)
            console.log("HAY UN ERROR")
        }else{
            console.log(select_query2);
            console.log(result);            
            return res.json({
                data: result
            })
        }
    });
    console.log("RETURN");
});
/* PIA */
app.post('/reMedic',bodyParser.json(),(req,res)=>{
    console.log(req.body)
    console.log(req.body[0],req.body[1])
    const select_query=`INSERT INTO registro_medicamentos (hora_registro, fecha_registro,rut_paciente,nombre_medicamento)
    VALUES ('${req.body[0].hora_r}','${req.body[0].fecha_r}','${req.body[1]}','${req.body[0].medicamento_r}') ON CONFLICT DO NOTHING `; 
    client.query(select_query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('blablsl');
        }else{
            console.log(select_query);
            //console.log(result);
            return res.json(res.body);
        }
    });
});
app.get('/revisar_tratamiento/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    const select_query2=`SELECT to_char(registro_medicamentos.fecha_registro,'YYYY-MM-DD') as fecha_registro, hora_registro, nombre_medicamento FROM registro_medicamentos WHERE rut_paciente=$1 `;  
    client.query(select_query2,[id],(err,result)=>{
          console.log(result);
        if(err){
            return res.send(err)
        }else{
           console.log(select_query2);
            console.log(result);  
                     
            return res.json({
                data: result.rows
            })
        }
    });
});
app.get('/medicamentos/:id',(req,res)=>{ //para desplegar medicamentos y poder registrarlos
    var id=req.params.id;
    console.log(id);
    const select_query2=`SELECT nombre_medicamento FROM paciente_medicamento WHERE rut_paciente=$1 AND fecha_termino> current_timestamp`;
    client.query(select_query2,[id],(err,result)=>{
        console.log(result);
      if(err){
          return res.send(err)
      }else{
          console.log(select_query2);
          console.log(result);          
          return res.json({
              data: result.rows
          })
      }
  });
  
});
app.get('/signos/:id',(req,res)=>{   //nueva para ver signos vitales
    var id=req.params.id;
    console.log(id);
    const select_query2=`SELECT temperatura, presion, respiracion, pulso, to_char(signos_vitales.fecha_signos,'YYYY-MM-DD') as fecha_signos, hora_signos FROM signos_vitales  WHERE rut_paciente=$1`;
    client.query(select_query2,[id],(err,result)=>{
        console.log(result);
      if(err){
          return res.send(err)
      }else{
         console.log(select_query2);
          console.log(result);  
                   
          return res.json({
              data: result.rows
          })
      }
  });
});
app.get('/rutDeLosPacientess',(req,res)=>{ //REGISTRAR TRATAMIENTO - MUESTRA LOS RUT
    const select_query=`SELECT distinct rut_paciente FROM hospitalizacion_domiciliaria`;
    client.query(select_query,(err,result)=>{
        console.log(result);
      if(err){
          return res.send(err)
      }else{
          console.log(select_query);
          console.log(result);          
          return res.json({
              data: result.rows
          })
      }
  });
});

/* ROBERTO */
app.get('/pacientesMedico/:id',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT C.rut_paciente, C.nombre_paciente, C.apellido_paciente , C.direccion_paciente, C.celular_paciente , A.id_hospitalizacion  FROM (SELECT rut_paciente , id_hospitalizacion, estado_hospitalizacion FROM hospitalizacion_domiciliaria M WHERE rut_medico = $1 and estado_hospitalizacion = 'Internado' ) A, paciente C WHERE A.rut_paciente = C.rut_paciente`;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log(select_query);
            //console.log(result);
            return res.json({
                data: result
            })
        }
    });
});
app.post('/datCitaPOST',bodyParser.json(),(req,res)=>{ 
    const select_query=`INSERT INTO cita_medica (rut_medico, rut_paciente, descripcion_cita, fecha_cita, hora_cita , id_hospitalizacion)
    VALUES ('${req.body.input_medico}','${req.body.input_rut}','${req.body.input_descripcion}','${req.body.input_fecha}', '${req.body.input_hora}' , '${req.body.id_hospitalizacion}') ON CONFLICT DO NOTHING`; 
    client.query(select_query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('blablsl');
        }else{
            console.log(select_query);
            //console.log(result);
            return res.json(res.body);
        }
    });
});
app.get('/VisualizarpacientesInternados/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    const select_query=`SELECT distinct X.rut_paciente, X.apellido_paciente, X.nombre_paciente, M.descripcion_hospitalizacion, M.gravedad_hospitalizacion FROM paciente X , (SELECT B.rut_paciente, B.gravedad_hospitalizacion, B.descripcion_hospitalizacion FROM  hospitalizacion_domiciliaria B  WHERE  B.estado_hospitalizacion = 'Internado' and B.rut_medico= $1 ) M  WHERE  X.rut_paciente=M.rut_paciente `;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log(select_query);
            return res.json({
                data: result
            })
        }
    });
});
/* NINOSKA */
/*****Comprobar login del paciente************/
app.post('/loginP', bodyParser.json(),(req,res)=>{
    var id_paciente=req.body.rut_paciente
    var contrasena=req.body.contrasena_paciente
    const select_query= `SELECT * FROM paciente WHERE rut_paciente=$1 AND contrasena_paciente=$2`;
    client.query(select_query,[id_paciente, contrasena],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Error');
        }else{
            res.json({
                data: result
            })
        }
    });
});
/*****Comprobar login del doctor************/
app.post('/loginMedico', bodyParser.json(),(req,res)=>{
    var id_medico=req.body.rut_medico
    var contrasena=req.body.contrasena_medico
    const select_query= `SELECT * FROM medico WHERE rut_medico=$1 AND contrasena_medico=$2`;
    client.query(select_query,[id_medico, contrasena],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Error');
        }else{
            res.json({
                data: result
            })
        }
    });
});
/****************Próxima visita del paciente*****************/
app.get('/fechaCita/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id)
    const select_query=`SELECT  hora_cita, descripcion_cita, nombre_medico, apellido_medico, celular_medico, to_char(fecha_cita,'YYYY-MM-DD') as fecha_cita FROM cita_medica C, paciente P, medico M WHERE C.rut_paciente=$1 AND C.rut_medico=M.rut_medico AND C.rut_paciente=P.rut_paciente AND C.fecha_cita >= current_timestamp`;
    client.query(select_query,[id],(err,result)=>{                                                                                          
        if(err){
            return res.send(err)
        }else{
            console.log(result);
            return res.json({
                data: result
            })
        }
    });
});
/****************Próximas visita del médico*******************/
app.get('/proxVMedico/:id',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT nombre_paciente, apellido_paciente, hora_cita, descripcion_cita, direccion_paciente, celular_paciente, to_char(fecha_cita,'YYYY-MM-DD') as fecha_cita  FROM cita_medica C, paciente P, medico M WHERE C.rut_medico=$1 AND C.rut_medico=M.rut_medico AND C.rut_paciente=P.rut_paciente AND C.fecha_cita >= current_timestamp`;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log(select_query);
            console.log(result);
            return res.json({
                data: result
            })
        }
    });
});
/*********************Nombre del médico***********************/
app.get('/nombreMedico/:id',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT UPPER(nombre_medico) as nombre_medico, UPPER(apellido_medico) as apellido_medico FROM medico M WHERE M.rut_medico=$1`;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log(result);
            return res.json({
                data: result
            })
        }
    });
});
/***********************Nombre del paciente*******************/
app.get('/nombrePaciente/:id',(req,res)=>{
    var id=req.params.id;
    const select_query=`SELECT UPPER(nombre_paciente) as nombre_paciente, UPPER(apellido_paciente) as apellido_paciente FROM paciente P WHERE P.rut_paciente=$1`;
    client.query(select_query,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            console.log(result);
            return res.json({
                data: result
            })
        }
    });
});
/***********Ver indicaciones del tratamiento***********/
app.get('/verTratamientoPaci/:id',(req,res)=>{ 
    var id = req.params.id;
    const select_query1 = `UPDATE receta_medica SET estado_receta = FALSE WHERE rut_paciente = $1 AND fecha_termino < current_timestamp`;
    client.query(select_query1,[id],(err,result)=>{
        if(err){
            return res.send(err)
        }else{
            const select_query=`SELECT P.nombre_medicamento, P.hora_medicamento, P.dosis_medicamento, R.medicamento_receta, R.descripcion_receta, R.estado_receta, to_char(R.fecha_receta,'YYYY-MM-DD') as fecha_receta, to_char(P.fecha_termino, 'YYYY-MM-DD') as fecha_termino FROM receta_medica R, paciente_medicamento P WHERE R.rut_paciente = $1 AND R.estado_receta = 'TRUE' AND R.rut_paciente = P.rut_paciente`; 
            client.query(select_query,[id],(err,result)=>{
                if(err){
                    return res.send(err)
                }else{
                    console.log(result);
                    return res.json({
                        data: result
                    })
                }
            });
        }
    });
});
/*********Ingresar signos vitales*********************/
app.post('/signosVitales/:id',bodyParser.json(),(req,res)=>{    
     var id = req.params.id;
     const select_query=`INSERT INTO signos_vitales (rut_paciente, temperatura, presion, respiracion, pulso, fecha_signos, hora_signos)
     VALUES ($1,'${req.body.temperatura}','${req.body.presion}','${req.body.respiracion}', '${req.body.pulso}', '${req.body.fecha_signos}', '${req.body.hora_signos}') ON CONFLICT DO NOTHING `; 
     client.query(select_query,[id],(err,result)=>{
         if(err){
             console.log(err);
             res.status(500).send('hola');
         }else{
             console.log(select_query);
             //console.log(result);
             return res.json(res.body);
         }
     });
 });
/* Carlos*/
app.get('/Ver-medic/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    const select_query2 =`SELECT  m.nombre_medicamento, m.bioequivalente_medicamento, m.retenido_medicamento, m.descripcion_medicamento, m.hora_medicamento FROM medicamento m WHERE m.nombre_medicamento=$1;`
    client.query(select_query2,[id],(err,result)=>{
          console.log(result);
        if(err){
            return res.send(err)
        }else{
           console.log(select_query2);
            console.log(result);  
                     
            return res.json({
                data: result
            })
        }
    });
});
app.get('/medicamentoss/:id',(req,res)=>{  //nuevo, para desplegar los medicamentos en las opciones de registro-medicam
    const select_query2 =`SELECT m.nombre_medicamento FROM medicamento as m WHERE NOT m.nombre_medicamento = 'Sin medicamento' ;`
    client.query(select_query2,(err,result)=>{
        console.log(result);
      if(err){
          return res.send(err)
      }else{
         console.log(select_query2);
          console.log(result);

          return res.json({
              data: result.rows
          })
      }
  });
});

/*************************************************************/
var server = app.listen(8000, function(){
    console.log('Servidor funcionando');
});
app.listen(80, function(){
    console.log('Cors activado')
})