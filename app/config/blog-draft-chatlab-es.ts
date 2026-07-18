/**
 * BORRADOR EN ESPAÑOL — artículo sobre ChatLab.
 * No está incluido en `blogPosts` (blog.ts): este archivo existe solo para
 * pulir el texto. Cuando esté traducido al inglés, se mueve el objeto a
 * blog.ts con la misma estructura, bloque a bloque (1:1).
 */

import type { BlogPost } from "./blog";

export const chatlabDraftEs: BlogPost = {
  slug: "chatlab-a-conversation-with-your-entire-archive",
  title: "ChatLab: una conversación con todo tu archivo fotográfico a la vez",
  excerpt:
    "Queríamos poder hablar con un catálogo entero — no con una foto suelta — y no encontramos nada ahí fuera que lo hiciera. Así nació ChatLab: un agente sobre modelos frontera que conoce tu archivo, ve tus fotos de verdad y orquesta el resto de herramientas de Photoreka.",
  description:
    "Qué es ChatLab y cómo funciona: un chat agéntico con modelos frontera, RAG y herramientas de búsqueda, análisis de patrones y scoring que trata una librería fotográfica como un todo — ve las fotos reales, no solo metadatos, y actúa como orquestador del organizador completo.",
  keywords:
    "ai photo chat, chat with photo library, agentic ai photography, ai photo curation, rag photography, photo catalog assistant, llm photo analysis, conversational photo curation, ai photo critique",
  category: "Inside Photoreka",
  tags: ["ChatLab", "AI Agents", "RAG", "Photo Curation"],
  coverPlaceholder: true,
  publishedAt: "2026-07-16",
  readingMinutes: 5,
  author: { name: "Photoreka Team", role: "Product" },
  toc: true,
  content: [
    {
      type: "p",
      html: "Hay preguntas que ningún buscador de fotos ha sabido responder nunca. <em>«¿Qué dice este archivo de mí como fotógrafo?» «¿Dónde me estoy repitiendo?» «¿Cuáles de mis fotos de este año aguantarían una convocatoria seria?»</em> No son consultas: no tienen palabras clave ni devuelven una lista ordenada. Son preguntas de conjunto — y hasta ahora, la única inteligencia capaz de responderlas era otro fotógrafo con horas por delante y tu catálogo entero en la cabeza.",
    },
    {
      type: "p",
      html: "<a href='/photo_chat'>ChatLab</a> nació de una necesidad muy concreta: queríamos poder hablar con todo un catálogo — no con una foto, con el cuerpo de trabajo completo. Y al buscar quién lo hacía ya, la sorpresa: no había nada. Sí, algunos chats describen con soltura una foto suelta; ninguno conoce tu catálogo, tu estilo ni tu evolución. Así que lo construimos dentro de Photoreka, sobre la misma arquitectura que mueve a los agentes de IA modernos: modelos frontera, RAG y un buen juego de herramientas.",
    },
    {
      type: "h2",
      text: "Un archivo es un todo, no una carpeta de ficheros",
      id: "un-archivo-es-un-todo",
    },
    {
      type: "p",
      html: "La idea central es fácil de enunciar: tu estilo no está en ninguna foto concreta. Es una <strong>propiedad emergente del conjunto</strong> — vive en lo que repites sin saberlo, en cómo ha cambiado tu paleta en tres años, en la distancia entre lo que crees que fotografías y lo que fotografías de verdad. Nada de eso es visible desde el ángulo local de las herramientas tradicionales: una foto, una carpeta, una búsqueda cada vez.",
    },
    {
      type: "p",
      html: "ChatLab trabaja sobre el catálogo completo. Puede medir proporciones (<em>«¿fotografío más a hombres o a mujeres?»</em>), rastrear tu evolución por épocas, leer clusters y desequilibrios que ninguna imagen individual contiene, y cruzarlo todo con las <a href='/photo_scoring'>puntuaciones artísticas</a> de cada foto. No responde con impresiones: responde con el archivo entero en la mano.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Agente, RAG y embeddings, en tres frases",
      html: "Un modelo de lenguaje no sabe nada de tus fotos: si le preguntas «a pelo», inventa con elegancia. <strong>RAG</strong> (Retrieval-Augmented Generation) lo arregla recuperando datos reales antes de responder — descripciones, etiquetas, puntuaciones y <strong>embeddings</strong>: coordenadas matemáticas donde la distancia significa parecido. Y un <strong>agente</strong> va más allá: dispone de herramientas — buscar por estilo, filtrar por puntuación, medir temas, muestrear por épocas, consultar la web — y decide él mismo cuáles usar y en qué orden, leyendo cada resultado antes del siguiente paso.",
    },
    {
      type: "image",
      alt: "ChatLab respondiendo a una petición de curación con varios grupos de fotos etiquetados",
      caption:
        "Una petición, varios grupos con criterio: la respuesta no es una lista de resultados, es una selección argumentada — placeholder, captura pendiente.",
      placeholder: true,
    },
    {
      type: "h2",
      text: "Qué se le puede pedir",
      id: "que-se-le-puede-pedir",
    },
    {
      type: "list",
      items: [
        "Curación compuesta: «mis mejores verticales en blanco y negro con gente mayor, ordenadas por composición». Una frase que combina búsqueda semántica, etiquetas, filtros y ranking — cosas que normalmente viven en cuatro pantallas distintas.",
        "Preguntas de conjunto: «¿qué temas dominan mi archivo?», «¿tengo más motos o coches?», «¿en qué año fui más arriesgado?».",
        "Mirada exterior: «busca las categorías de este año del premio X y dime qué fotos mías encajan». El agente consulta la web y convierte los criterios en una búsqueda sobre tu catálogo.",
        "Contradicciones reveladoras: «fotos que impresionan a primera vista pero no cuentan nada» — estética alta, narrativa baja. O la inversa: joyas ocultas que puntúan alto en historia y pasan desapercibidas.",
        "Crítica con la foto delante: adjunta una imagen y pide una lectura honesta — o pídele sus hermanas: por paleta, por narrativa o por parecido visual.",
      ],
    },
    {
      type: "h2",
      text: "Cómo funciona por dentro",
      id: "como-funciona-por-dentro",
    },
    {
      type: "p",
      html: "La arquitectura tiene dos fases. La primera es un <strong>investigador</strong>: un modelo rápido cuyo único trabajo es decidir qué herramientas llamar — en paralelo cuando son independientes, en cadena cuando una alimenta a la otra — y reunir evidencia. Tiene prohibido juzgar. La segunda es un <strong>curador</strong>: un modelo frontera con capacidad visual que recibe toda esa evidencia y — esto es lo importante — <strong>ve las fotos de verdad</strong>: miniaturas reales, no solo metadatos, lado a lado, antes de escribir una sola línea. Verifica, descarta lo tangencial, agrupa y le pone nombre a cada grupo.",
    },
    {
      type: "p",
      html: "Una regla de hierro lo gobierna todo: el curador solo puede hablar de fotos que las herramientas hayan devuelto de verdad. Si una búsqueda vuelve vacía, la respuesta lo dice — no rellena el hueco con fotos imaginarias. Cada afirmación tiene una foto real detrás.",
    },
    {
      type: "image",
      alt: "Diagrama del pipeline interno de ChatLab: una fase investigadora que orquesta las herramientas del catálogo y una fase curadora con acceso visual a las miniaturas",
      caption:
        "El mecanismo, simplificado: un investigador que reúne evidencia con las herramientas del catálogo, y un curador con ojos que la juzga — placeholder, diagrama pendiente.",
      placeholder: true,
    },
    {
      type: "h2",
      text: "Un ojo que se adapta a tu perfil",
      id: "un-ojo-que-se-adapta",
    },
    {
      type: "p",
      html: "Un buen editor no juzga igual un ensayo documental que un book comercial, y ChatLab tampoco. Sus criterios se adaptan al perfil de cada fotógrafo: en fotografía de calle pesan más la espontaneidad, los juegos visuales y la originalidad; en documental, el mensaje y la narrativa; en trabajo comercial, la claridad del sujeto y la intención. Y las puntuaciones almacenadas son punto de partida, no sentencia: cada foto fue puntuada en soledad, y <strong>la comparación lado a lado es exactamente lo que la conversación añade</strong>.",
    },
    {
      type: "h2",
      text: "El chat que orquesta todo lo demás",
      id: "el-chat-que-orquesta",
    },
    {
      type: "p",
      html: "Construyendo asistentes para otros productos aprendimos una lección que se repite siempre: cuando un dashboard tiene chat, el usuario acaba yendo al chat. Con ChatLab pasa igual, y tiene sentido — puede hacer, en cierta medida, casi todo lo que harías en un organizador de fotos: buscar, comparar, agrupar, analizar. Seamos francos con los matices: su alcance por respuesta es acotado, y cada conversación consume tokens de modelos frontera, así que para la exploración masiva las herramientas dedicadas — <a href='/ai_photo_search'>Search</a>, el <a href='/photo_3D_atlas'>Atlas</a>, el Workspace — siguen siendo más eficientes y, sobre todo, te dan más control. Pero su papel de <strong>orquestador de todo el organizador</strong> es innegable.",
    },
    {
      type: "p",
      html: "Esa orquestación va en las dos direcciones. Hacia fuera: bajo cada respuesta aparecen <strong>acciones de un clic</strong> — crear una colección con el nombre que el curador ya propuso, convertir un grupo en serie, llevar la selección a otra herramienta — siempre con tu confirmación. Y hacia dentro: ChatLab usa las mismas herramientas que la interfaz te ofrece a ti — la misma búsqueda, los mismos patrones, clusters, distribución de etiquetas y scoring. No es un chat construido <em>encima</em> de Photoreka: está hecho <em>de</em> Photoreka.",
    },
    {
      type: "image",
      alt: "Acciones sugeridas bajo una respuesta de ChatLab: crear colección, añadir a una serie, abrir en Workspace",
      caption:
        "La conversación desemboca en la aplicación: acciones de un clic bajo cada respuesta, siempre con confirmación — placeholder, captura pendiente.",
      placeholder: true,
    },
    {
      type: "quote",
      text: "Un buscador te devuelve lo que pides. Un curador discute contigo lo que pides. Esa diferencia — entre una lista de resultados y un criterio — es la que ChatLab viene a cubrir.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Lo que ChatLab no es",
      html: "No modifica tu librería por su cuenta: toda acción pide tu confirmación. Trabaja con selecciones acotadas (~20 fotos por respuesta): un punto de partida con criterio, no un inventario. Y su lectura es una <strong>segunda opinión</strong>, no la última palabra — la mejor curación sale de la simbiosis entre el sistema y tu ojo.",
    },
    {
      type: "h2",
      text: "Lo que viene",
      id: "lo-que-viene",
    },
    {
      type: "p",
      html: "ChatLab está en pleno crecimiento. Hay nuevas herramientas en camino para el agente, y estamos explorando un enfoque <strong>multi-agente</strong> que le permita «ver» muchas más fotos por conversación: varios curadores mirando en paralelo regiones distintas del catálogo y poniendo su lectura en común. La dirección es clara: cada mes que pasa, el chat conoce tu archivo un poco mejor.",
    },
    {
      type: "cta",
      eyebrow: "Pruébalo con un archivo real",
      title: "Habla con un catálogo de verdad",
      text: "La demo incluye ChatLab sobre un archivo fotográfico real: pregunta, pide selecciones, discútele las respuestas.",
      buttonLabel: "Probar la demo",
      action: "demo",
    },
    {
      type: "p",
      html: "No prometemos magia. Prometemos algo más raro: un interlocutor que conoce tu catálogo entero, que mira tus fotos de verdad y que convierte cada respuesta en trabajo real dentro de la aplicación. Esa conversación no existía ahí fuera — y era la que llevábamos años queriendo tener con nuestro propio archivo.",
    },
  ],
};
