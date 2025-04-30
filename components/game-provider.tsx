"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// List of topics for the game
const TOPICS = [
  // Temas generales
  "Lugares para hacer el amor",
  "Excusas para no ir a trabajar",
  "Cosas que haces cuando nadie te ve",
  "Mentiras comunes en una primera cita",
  "Razones para terminar una relación",
  "Cosas que encuentras en el bolso de una abuela",
  "Lugares inapropiados para un estornudo",
  "Apodos vergonzosos de la infancia",
  "Cosas que la gente hace en el baño",
  "Olores corporales inconfundibles",
  "Lugares donde te has quedado dormido accidentalmente",
  "Cosas que dices después de un orgasmo",
  "Apodos para partes íntimas",
  "Peores lugares para una flatulencia",
  "Excusas para no tener sexo",
  "Cosas que has robado de un hotel",
  "Frases de películas para usar durante el sexo",
  "Peores regalos para una suegra",
  "Mentiras que le dices al médico",
  "Cosas que has encontrado entre los cojines del sofá",
  "Lugares donde has vomitado",
  "Cosas que gritas durante una pelea",
  "Actividades que haces desnudo cuando estás solo",
  "Peores momentos para que te llame tu madre",
  "Formas de llamar al inodoro",
  "Maneras de deshacerte de una visita indeseada",
  "Peores lugares para una primera cita",
  "Formas de llamar a la borrachera",
  "Excusas para salir de una reunión aburrida",
  "Cosas que has lamido por una apuesta",

  // Situaciones embarazosas
  "Momentos en que te has tirado un gas inoportunamente",
  "Situaciones en las que te han pillado mintiendo",
  "Cosas que has dicho dormido",
  "Lugares donde te has quedado encerrado",
  "Mensajes que has enviado a la persona equivocada",
  "Excusas para cancelar planes en el último minuto",
  "Cosas vergonzosas que haces cuando estás solo",
  "Situaciones en las que te has equivocado de persona",
  "Momentos en que te has caído en público",
  "Cosas que has hecho para impresionar a alguien y han salido mal",
  "Sonidos embarazosos del cuerpo humano",
  "Cosas que has perdido en lugares extraños",
  "Momentos en que has confundido nombres",
  "Situaciones en las que la ropa te ha jugado una mala pasada",
  "Lugares donde te has quedado dormido inoportunamente",
  "Errores gramaticales que cometes habitualmente",
  "Momentos en que has respondido a la persona equivocada",
  "Cosas que has roto en casa de otras personas",
  "Comentarios inapropiados que has hecho sin querer",
  "Situaciones en las que te has reído en un momento serio",
  "Momentos en que has llamado 'mamá' a tu profesora",
  "Cosas que has dicho en una entrevista de trabajo y te arrepientes",
  "Situaciones en las que te has manchado la ropa en público",
  "Momentos en que has entrado al baño equivocado",
  "Cosas que has olvidado llevar a una cita importante",
  "Situaciones en las que has saludado a un desconocido pensando que era otra persona",
  "Momentos en que has derramado bebida sobre alguien",
  "Cosas que has hecho para evitar a alguien en la calle",
  "Situaciones en las que has cantado la letra incorrecta de una canción en público",
  "Momentos en que has dejado el micrófono abierto accidentalmente",

  // Vida cotidiana cómica
  "Mentiras piadosas que dices habitualmente",
  "Excusas para no hacer ejercicio",
  "Cosas que haces mientras estás en el baño",
  "Formas creativas de llamar a la resaca",
  "Cosas que les dices a las mascotas cuando nadie está escuchando",
  "Trucos para parecer ocupado en el trabajo",
  "Alimentos que finges que te gustan",
  "Frases que dices cuando te asustas",
  "Cosas que haces para evitar a los vecinos",
  "Mentiras que les cuentas a los niños",
  "Formas de escapar de una conversación aburrida",
  "Cosas que guardas 'por si acaso' y nunca usas",
  "Excusas para no contestar el teléfono",
  "Cosas que miras disimuladamente en casa ajena",
  "Maneras de disimular que no recuerdas el nombre de alguien",
  "Cosas que comes a escondidas",
  "Formas de llamar al control remoto",
  "Excusas para no ir a una reunión familiar",
  "Cosas que haces para impresionar al repartidor",
  "Formas extrañas de abrir los envases difíciles",
  "Cosas que guardas en la mesita de noche",
  "Trucos para parecer inteligente",
  "Expresiones que usas cuando te golpeas el dedo pequeño",
  "Cosas que haces mientras esperas que cargue una página web",
  "Mentiras sobre tu dieta",
  "Formas de llamar a tus plantas",
  "Cosas que dices cuando te sorprenden haciendo algo raro",
  "Excusas para no prestarte a la comida de otro",
  "Formas creativas de matar insectos",
  "Cosas que haces en el ascensor para evitar conversaciones",

  // Hábitos secretos
  "Cosas que haces cuando nadie te está mirando",
  "Búsquedas extrañas en internet",
  "Conversaciones imaginarias en la ducha",
  "Apodos que le pones a los vecinos sin que lo sepan",
  "Alimentos que comes de formas poco convencionales",
  "Cosas que guardas 'por si acaso'",
  "Rituales extraños antes de dormir",
  "Canciones que cantas mal a propósito",
  "Poses extrañas para dormir",
  "Cosas que haces para parecer ocupado",
  "Manías que tienes al comer",
  "Pensamientos durante una reunión aburrida",
  "Cosas que haces para evitar las tareas domésticas",
  "Supersticiones personales ridículas",
  "Frases que dices cuando estás solo",
  "Cosas que coleccionas en secreto",
  "Combinaciones extrañas de comida que te gustan",
  "Formas poco convencionales de usar objetos cotidianos",
  "Cosas que haces para evitar a ciertas personas",
  "Mentiras blancas que dices regularmente",
  "Hábitos extraños al usar el baño",
  "Nombres que le pones a tus plantas o electrodomésticos",
  "Expresiones faciales cuando te miras al espejo",
  "Cosas que guardas 'por nostalgia' pero son basura",
  "Posiciones extrañas para ver la televisión",
  "Sonidos que haces inconscientemente",
  "Formas raras de rascarte",
  "Cosas que repites para ti mismo como mantra",
  "Objetos con los que hablas como si fueran personas",
  "Excusas que te dices a ti mismo para procrastinar",

  // Relaciones sociales
  "Excusas para no responder mensajes",
  "Formas de evitar un abrazo no deseado",
  "Cosas que dices para terminar una conversación",
  "Mentiras en perfiles de citas online",
  "Excusas para cancelar planes de última hora",
  "Cosas que has fingido entender en una conversación",
  "Señales de que quieres que alguien se vaya de tu casa",
  "Maneras de esquivar un beso en la mejilla",
  "Temas de conversación para momentos incómodos",
  "Cosas que finges que te interesan para agradar",
  "Excusas para no prestar dinero",
  "Formas de fingir que estás ocupado cuando ves a alguien que quieres evitar",
  "Mentiras sobre tus habilidades",
  "Cosas que haces para impresionar en una primera cita",
  "Excusas para no devolver algo prestado",
  "Formas de salir de un grupo de WhatsApp sin ofender",
  "Cosas que dices cuando te presentan a alguien y no entiendes su nombre",
  "Mentiras sobre tus aficiones",
  "Excusas para rechazar una invitación",
  "Formas de fingir interés en una conversación aburrida",
  "Mentiras sobre tu situación sentimental",
  "Cosas que haces para evitar a un ex",
  "Excusas para no asistir a una boda",
  "Formas de escapar de alguien que habla demasiado",
  "Cosas que dices cuando te preguntan '¿cómo estás?' pero no quieres responder honestamente",
  "Excusas para no ir a la casa de tus suegros",
  "Formas de fingir que sabes de lo que están hablando",
  "Mentiras sobre tu edad",
  "Cosas que haces para parecer más interesante",
  "Excusas para no dar tu número de teléfono",

  // Trabajo y estudio
  "Excusas para no ir a trabajar",
  "Cosas que haces para parecer ocupado en la oficina",
  "Mentiras en tu currículum",
  "Formas de evitar a compañeros molestos",
  "Excusas para no participar en actividades de team building",
  "Cosas que robas de la oficina",
  "Formas de hacer tiempo hasta la hora de salida",
  "Mentiras sobre por qué llegas tarde",
  "Cosas que dices cuando te pillan durmiendo en el trabajo",
  "Excusas para no asistir a la fiesta de la empresa",
  "Formas de escaquearte del trabajo en equipo",
  "Mentiras sobre por qué no has terminado una tarea",
  "Cosas que haces durante las videollamadas que nadie puede ver",
  "Excusas para rechazar horas extra",
  "Formas de evitar la charla de la máquina de café",
  "Mentiras sobre tu productividad",
  "Cosas que comes sigilosamente en tu puesto",
  "Excusas para no compartir tu comida en la oficina",
  "Formas de escaquearte de las reuniones",
  "Mentiras sobre tus conocimientos informáticos",
  "Cosas que buscas en internet cuando deberías estar trabajando",
  "Excusas para no responder emails",
  "Formas de fingir que entiendes lo que dice tu jefe",
  "Mentiras sobre por qué necesitas un día libre",
  "Cosas que haces cuando tu jefe no está",
  "Excusas para no presentarte voluntario",
  "Formas de hacer que el tiempo pase más rápido en el trabajo",
  "Mentiras sobre tus responsabilidades laborales",
  "Cosas que tomas prestadas y nunca devuelves",
  "Excusas para no participar en el amigo invisible",

  // Tecnología y redes sociales
  "Mentiras sobre por qué no has contestado un mensaje",
  "Cosas que aparecen en tu historial de búsqueda",
  "Excusas para no aceptar solicitudes de amistad",
  "Formas de espiar a tu ex en redes sociales",
  "Mentiras sobre por qué has dejado de seguir a alguien",
  "Cosas que has comprado por impulso online",
  "Excusas para no subir fotos en las que sales mal",
  "Formas de fingir que entiendes de tecnología",
  "Mentiras sobre cuánto tiempo pasas en el móvil",
  "Cosas que has buscado en modo incógnito",
  "Excusas para no prestar tu teléfono",
  "Formas de evitar videollamadas",
  "Mentiras sobre por qué tienes tantas pestañas abiertas",
  "Cosas que haces mientras esperas que algo se descargue",
  "Excusas para no participar en cadenas de mensajes",
  "Formas de fingir problemas técnicos",
  "Mentiras sobre por qué no has visto una publicación",
  "Cosas que has compartido sin leer completamente",
  "Excusas para no responder a comentarios",
  "Formas de salir de grupos de chat sin que se note",
  "Mentiras sobre tu nivel de batería",
  "Cosas que dices cuando te pillan mirando el móvil",
  "Excusas para no devolver llamadas perdidas",
  "Formas de evitar que te etiqueten en fotos",
  "Mentiras sobre por qué tienes dos cuentas en una red social",
  "Cosas que borras de tu historial regularmente",
  "Excusas para no prestar tu cargador",
  "Formas de evitar que alguien vea tu pantalla",
  "Mentiras sobre por qué sigues a ciertos famosos",
  "Cosas que googleas y luego te arrepientes",

  // Comida y bebida
  "Comidas que finges que te gustan",
  "Excusas para no probar algo que te ofrecen",
  "Formas extrañas de comer cosas normales",
  "Mentiras sobre tus habilidades culinarias",
  "Cosas que comes a escondidas",
  "Excusas para no compartir tu postre",
  "Formas de disimular que no te gusta la comida",
  "Mentiras sobre tu dieta",
  "Cosas que pides para llevar y nunca comes",
  "Excusas para pedir comida a domicilio",
  "Formas de comer los restos de otros sin que se note",
  "Mentiras sobre por qué no bebes alcohol",
  "Cosas que haces con la comida cuando nadie mira",
  "Excusas para no cocinar",
  "Formas de esconder que te has comido algo de otro",
  "Mentiras sobre alergias alimentarias",
  "Cosas que mezclas que daría asco a otros",
  "Excusas para no invitar a cenar",
  "Formas de parecer un entendido en vinos",
  "Mentiras sobre por qué no has terminado tu plato",
  "Cosas que robas del plato de otros",
  "Excusas para repetir postre",
  "Formas de evitar pagar la cuenta",
  "Mentiras sobre cuánto alcohol has bebido",
  "Cosas que haces con las sobras",
  "Excusas para no beber más",
  "Formas de ocultar que has pedido el plato más caro",
  "Mentiras sobre seguir recetas al pie de la letra",
  "Cosas que comes directamente del refrigerador a medianoche",
  "Excusas para no probar la comida casera de alguien",

  // Salud y fitness
  "Excusas para no ir al gimnasio",
  "Mentiras sobre tu rutina de ejercicios",
  "Cosas que exageras en tu chequeo médico",
  "Formas de fingir que te duele algo",
  "Excusas para no participar en una carrera benéfica",
  "Mentiras sobre cuánta agua bebes al día",
  "Cosas que haces para parecer en forma sin esfuerzo",
  "Formas de evitar pesarte",
  "Excusas para saltarte una dieta",
  "Mentiras sobre cuántas horas duermes",
  "Cosas que omites decirle al dentista",
  "Formas de fingir que haces ejercicio",
  "Excusas para no usar protector solar",
  "Mentiras sobre tus hábitos saludables",
  "Cosas que haces para parecer enfermo",
  "Formas de evitar una vacuna",
  "Excusas para no tomar medicamentos",
  "Mentiras sobre alergias",
  "Cosas que exageras en una consulta médica",
  "Formas de fingir que sigues consejos de salud",
  "Excusas para no donar sangre",
  "Mentiras sobre el tiempo que llevas haciendo yoga",
  "Cosas que comes a escondidas durante una dieta",
  "Formas de evitar hablar de tu peso",
  "Excusas para no ir al médico",
  "Mentiras sobre por qué no has dormido bien",
  "Cosas que finges que te duelen para evitar actividades",
  "Formas de simular una lesión deportiva",
  "Excusas para no comer vegetales",
  "Mentiras sobre cuándo fue tu última revisión dental",

  // Economía personal
  "Excusas para no prestar dinero",
  "Mentiras sobre el precio de tus compras",
  "Cosas que finges que son más caras de lo que son",
  "Formas de evitar pagar tu parte",
  "Excusas para no devolver dinero prestado",
  "Mentiras sobre ofertas que has encontrado",
  "Cosas que dices cuando te piden el recibo",
  "Formas de fingir que no tienes efectivo",
  "Excusas para no invitar la ronda",
  "Mentiras sobre tu situación financiera",
  "Cosas que compras a escondidas",
  "Formas de justificar gastos innecesarios",
  "Excusas para no dar propina",
  "Mentiras sobre el coste de reparaciones",
  "Cosas que pides prestadas y nunca devuelves",
  "Formas de evitar hablar de tu sueldo",
  "Excusas para no participar en regalos grupales",
  "Mentiras sobre ofertas que has rechazado",
  "Cosas que dices cuando te preguntan cuánto te costó algo",
  "Formas de escaquearte de pagar la cuenta",
  "Excusas para no comprar algo de marca",
  "Mentiras sobre la razón de tus compras",
  "Cosas que regalas que en realidad no querías",
  "Formas de fingir que algo usado es nuevo",
  "Excusas para no contribuir a causas benéficas",
  "Mentiras sobre las ofertas que has aprovechado",
  "Cosas que haces para ahorrar que no cuentas a nadie",
  "Formas de justificar compras caras",
  "Excusas para no compartir suscripciones",
  "Mentiras sobre el valor de tus posesiones",

  // Relaciones románticas
  "Excusas para no tener una segunda cita",
  "Mentiras en perfiles de aplicaciones de citas",
  "Cosas que exageras sobre tu ex",
  "Formas de fingir interés romántico",
  "Excusas para no presentar a tu pareja a tu familia",
  "Mentiras sobre relaciones pasadas",
  "Cosas que espías de tu pareja",
  "Formas de evitar hablar del futuro en una relación",
  "Excusas para no pasar la noche juntos",
  "Mentiras sobre por qué no contestaste el teléfono",
  "Cosas que finges que te gustan por tu pareja",
  "Formas de evitar conocer a los amigos de tu pareja",
  "Excusas para no celebrar San Valentín",
  "Mentiras sobre por qué terminaste con alguien",
  "Cosas que ocultas en los primeros meses de relación",
  "Formas de fingir que no estás celoso",
  "Excusas para no hacer planes a largo plazo",
  "Mentiras sobre tu 'número'",
  "Cosas que exageras para impresionar en una cita",
  "Formas de escapar de una cita desastrosa",
  "Excusas para no presentar a alguien como tu pareja",
  "Mentiras sobre por qué estás soltero",
  "Cosas que haces para comprobar si le gustas a alguien",
  "Formas de evitar el tema del matrimonio",
  "Excusas para no ir a casa de los suegros",
  "Mentiras sobre porqué no quieres tener hijos",
  "Cosas que dices durante una ruptura",
  "Formas de fingir que no has visto a tu ex",
  "Excusas para recuperar tus cosas después de una ruptura",
  "Mentiras sobre por qué sigues a tu ex en redes sociales",

  // Familia y amigos
  "Excusas para no visitar a familiares",
  "Mentiras piadosas a los abuelos",
  "Cosas que finges que te interesan en reuniones familiares",
  "Formas de evitar a ciertos parientes",
  "Excusas para no asistir a bodas familiares",
  "Mentiras sobre por qué no has llamado",
  "Cosas que ocultas a tus padres",
  "Formas de escapar de conversaciones familiares incómodas",
  "Excusas para no quedarte a dormir en casa de amigos",
  "Mentiras sobre por qué no puedes ser padrino o madrina",
  "Cosas que dices para evitar hablar de política en familia",
  "Formas de fingir que te gustan los regalos horribles",
  "Excusas para no prestar tu coche",
  "Mentiras sobre por qué no puedes cuidar mascotas ajenas",
  "Cosas que evitas mencionar en reuniones familiares",
  "Formas de escaquearte de ayudar en la cocina",
  "Excusas para no aparecer en fotos familiares",
  "Mentiras sobre tu vida a parientes lejanos",
  "Cosas que finges que te gustan de tus sobrinos",
  "Formas de evitar dar consejos solicitados",
  "Excusas para no participar en tradiciones familiares",
  "Mentiras sobre por qué no puedes prestar dinero a amigos",
  "Cosas que finges recordar de la infancia",
  "Formas de escapar de compromisos con amigos",
  "Excusas para no invitar a alguien a tu casa",
  "Mentiras sobre por qué has perdido contacto",
  "Cosas que ocultas cuando alguien visita tu casa",
  "Formas de fingir que sigues en contacto con viejos amigos",
  "Excusas para no ser testigo en una boda",
  "Mentiras sobre por qué no puedes hacer de niñero",

  // Viajes y vacaciones
  "Excusas para no ir de vacaciones con amigos",
  "Mentiras sobre experiencias de viaje",
  "Cosas que exageras sobre lugares que has visitado",
  "Formas de evitar actividades turísticas populares",
  "Excusas para no compartir habitación",
  "Mentiras sobre conocer idiomas extranjeros",
  "Cosas que haces para parecer un viajero experimentado",
  "Formas de escaquearte de pagar gastos compartidos",
  "Excusas para no visitar monumentos aburridos",
  "Mentiras sobre problemas con el equipaje",
  "Cosas que robas de hoteles",
  "Formas de fingir que disfrutas de la comida local",
  "Excusas para no hacer fotos de grupo",
  "Mentiras sobre cuánto has gastado en souvenirs",
  "Cosas que haces para saltarte colas turísticas",
  "Formas de evitar actividades de 'team building' en viajes de empresa",
  "Excusas para quedarte en el hotel mientras otros salen",
  "Mentiras sobre por qué prefieres un destino",
  "Cosas que finges que te interesan en museos",
  "Formas de evitar sentarte junto a desconocidos en aviones",
  "Excusas para no conducir en carreteras desconocidas",
  "Mentiras sobre aventuras que has tenido viajando",
  "Cosas que exageras en historias de viaje",
  "Formas de fingir que no tienes jet lag",
  "Excusas para no participar en deportes de aventura",
  "Mentiras sobre por qué no has traído regalos",
  "Cosas que ocultas en la declaración de aduanas",
  "Formas de justificar gastos excesivos en vacaciones",
  "Excusas para no mostrar todas tus fotos de viaje",
  "Mentiras sobre contratiempos durante unas vacaciones",

  // Tecnología y gadgets
  "Excusas para comprar el último modelo de smartphone",
  "Mentiras sobre entender términos tecnológicos",
  "Cosas que finges saber sobre ordenadores",
  "Formas de evitar ayudar con problemas técnicos",
  "Excusas para no prestar dispositivos electrónicos",
  "Mentiras sobre la necesidad de nuevos gadgets",
  "Cosas que haces para parecer un experto en tecnología",
  "Formas de justificar gastos en accesorios tecnológicos",
  "Excusas para no actualizar software",
  "Mentiras sobre por qué necesitas más espacio de almacenamiento",
  "Cosas que culpas al WiFi",
  "Formas de fingir problemas técnicos para evitar videollamadas",
  "Excusas para no compartir contraseñas",
  "Mentiras sobre la duración de la batería de tus dispositivos",
  "Cosas que dices cuando alguien te pide arreglar su ordenador",
  "Formas de evitar explicar cómo funciona algo",
  "Excusas para no responder mensajes",
  "Mentiras sobre por qué tu internet es lento",
  "Cosas que culpas a los 'virus informáticos'",
  "Formas de fingir que sabes programar",
  "Excusas para no descargar aplicaciones que otros recomiendan",
  "Mentiras sobre cuánto tiempo pasas en redes sociales",
  "Cosas que borras antes de prestar tu teléfono",
  "Formas de evitar hablar de cuánto costaron tus gadgets",
  "Excusas para tener múltiples dispositivos del mismo tipo",
  "Mentiras sobre la razón de tus compras tecnológicas",
  "Cosas que haces para ocultar tu historial de navegación",
  "Formas de justificar suscripciones digitales",
  "Excusas para no añadir a alguien en redes sociales",
  "Mentiras sobre tu competencia digital",

  // Situaciones absurdas
  "Excusas para tener un pato en la oficina",
  "Mentiras para explicar por qué llevas un colador en la cabeza",
  "Cosas que dirías si te pillan hablando con una planta",
  "Formas de justificar que estés bailando solo en un ascensor",
  "Excusas para llevar un disfraz en un día normal",
  "Mentiras para explicar por qué estás cubierto de purpurina",
  "Cosas que dirías si te encuentran en un contenedor",
  "Formas de explicar por qué tienes una cabra en tu coche",
  "Excusas para estar bañándote en una fuente pública",
  "Mentiras para justificar que estés oliendo la cabeza de un desconocido",
  "Cosas que dirías si te pillan probándote ropa en una tienda de mascotas",
  "Formas de explicar por qué estás gritando a un árbol",
  "Excusas para llevar un casco de astronauta en el supermercado",
  "Mentiras para justificar que estés comiendo arena",
  "Cosas que dirías si te encuentran escondido bajo una mesa en una boda",
  "Formas de explicar por qué tienes las cejas pintadas de azul",
  "Excusas para estar construyendo un fuerte con rollos de papel higiénico",
  "Mentiras para justificar que estés lamiendo un escaparate",
  "Cosas que dirías si te pillan hablando con un maniquí",
  "Formas de explicar por qué llevas calcetines diferentes a propósito",

  // Para adultos
  "Posiciones sexuales con nombres graciosos",
  "Lugares extraños donde has tenido relaciones",
  "Excusas para evitar el sexo oral",
  "Mentiras sobre tu experiencia sexual",
  "Cosas que has dicho en un momento íntimo y te arrepientes",
  "Formas de describir genitales sin usar términos explícitos",
  "Excusas para terminar rápido",
  "Mentiras sobre tu 'número'",
  "Cosas que has fingido en la cama",
  "Formas de pedir algo nuevo sin parecer raro",
  "Excusas para no quitarte cierta prenda",
  "Mentiras sobre tu tamaño",
  "Cosas que has buscado y borrado del historial",
  "Formas de describir un orgasmo sin usar la palabra",
  "Excusas para no tener sexo en la casa de tus padres",
  "Mentiras sobre tus fantasías",
  "Cosas que has comprado a escondidas",
  "Formas de iniciar 'la conversación' con adolescentes",
  "Excusas para tener juguetes sexuales",
  "Mentiras sobre por qué tienes lubricante",
  "Cosas que has dicho por accidente durante el sexo",
  "Formas de pedir consentimiento de manera sexy",
  "Excusas para la ausencia de protección",
  "Mentiras sobre tus preferencias en la cama",
  "Cosas que haces para mejorar tu atractivo sexual",
  "Formas de describir un beso francés a un niño"
  ]

type GameState = "setup" | "reveal" | "playing" | "finished"

interface GameContextType {
  gameState: GameState
  playerCount: number
  currentPlayer: number
  currentTopic: string
  impostorIndex: number
  isRevealed: boolean
  setPlayerCount: (count: number) => void
  startGame: () => void
  nextPlayer: () => void
  revealRole: () => void
  finishRound: () => void
  startNewRound: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>("setup")
  const [playerCount, setPlayerCount] = useState(3)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [currentTopic, setCurrentTopic] = useState("")
  const [impostorIndex, setImpostorIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  const selectRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * TOPICS.length)
    return TOPICS[randomIndex]
  }

  const selectImpostor = (count: number) => {
    return Math.floor(Math.random() * count) + 1
  }

  const startGame = () => {
    setCurrentTopic(selectRandomTopic())
    setImpostorIndex(selectImpostor(playerCount))
    setCurrentPlayer(1)
    setIsRevealed(false)
    setGameState("reveal")
  }

  const revealRole = () => {
    setIsRevealed(true)
  }

  const nextPlayer = () => {
    if (currentPlayer < playerCount) {
      setCurrentPlayer(currentPlayer + 1)
      setIsRevealed(false)
    } else {
      setGameState("playing")
    }
  }

  const finishRound = () => {
    setGameState("finished")
  }

  const startNewRound = () => {
    setCurrentTopic(selectRandomTopic())
    setImpostorIndex(selectImpostor(playerCount))
    setCurrentPlayer(1)
    setIsRevealed(false)
    setGameState("reveal")
  }

  const value = {
    gameState,
    playerCount,
    currentPlayer,
    currentTopic,
    impostorIndex,
    isRevealed,
    setPlayerCount,
    startGame,
    nextPlayer,
    revealRole,
    finishRound,
    startNewRound,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
