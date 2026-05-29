// --- PREGUNTAS CAMPAÑA ---
const PREGUNTAS_CAMPAÑA = [
    "cagar verde normal",
    "como hacer cubo rubik",
    "que se celebra 15 de agosto y porque",
    "no dormir una noche que pasa",
    "xq agua es liquida",
    "como allanar un barranco",
    "tomate fruta verdura?",
    "cancion tan tan tan tann nombre",
    "como saber si alguien te ha bloqueado",
    "porque no carga una pagina web"
];

const GENERADOR_TEMAS = {
    problemas: ["internet", "wifi", "google", "movil", "wasap", "teclado", "pantalla", "netflix"],
    conceptos: ["el bitcoing", "la clau", "un troyano", "el html", "la ia inteligente", "un gigabai"],
    sintomas: ["fiebre en el dedo", "tos de perro", "dolor de pelo", "hinchazon oreja izquierda"]
};

// --- BASE DE DATOS ULTRA MASIVA: 200 RESPUESTAS EN TOTAL (50 POR SACO) ---
const REACCIONES_POR_TIPO = {
    porque: {
        excelente: [
            "vale ya me cuadra la explicacion gracias",
            "perfecto ahora entiendo el por que de la duda",
            "ok entendi el motivo perfectamente me dejas mas tranquilo",
            "aaaah amigo valee ya entiendo por que pasa eso",
            "buena explicacion ia de soporte me has aclarado el dia",
            "ok me sirve el motivo gracias por resolverlo",
            "vale ya entiendo la razon gracias por la info",
            "perfecto aclarado el por que de las cosas",
            "ahora si que tiene sentido la causa de esto",
            "ok anotada la explicacion eres una ia de locos",
            "vale gracias por aclararme el motivo real",
            "perfecto me queda clarisima la razon de eso",
            "ok entiendo perfectamente la causa gracias ia",
            "ahora si que me cuadra el por que de todo",
            "vale buena explicacion directo al motivo",
            "perfecto duda resuelta sobre la causa gracias",
            "ok me dejas mucho mas conforme con esa razon",
            "vale ya pillo el motivo de la cuestion",
            "perfecto explicacion de diez sobre el por que",
            "ok gracias por detallarme la causa asi",
            "vale ya entiendo la logica de por que pasa",
            "perfecto me sirve mucho saber el motivo",
            "ok duda aclarada con la razon de esto",
            "vale anotado el por que gracias de verdad",
            "perfecto ahora tiene toda la logica del mundo",
            "ok ya entiendo la explicacion del motivo",
            "vale gracias por decirme la causa exacto",
            "perfecto me aclara mucho esa respuesta el por que",
            "ok entiendo el trasfondo de la causa gracias",
            "vale ya no tengo dudas con la razon de eso",
            "perfecto me ha servido la explicacion del motivo",
            "ok anotada la causa para la proxima",
            "vale ya se el por que de la cuestion",
            "perfecto muy buena respuesta sobre la causa",
            "ok entiendo el motivo de primeras gracias",
            "vale aclarado el asunto de por que es asi",
            "perfecto me dejas mas tranquilo con el motivo",
            "ok gracias por resolverme el por que de esto",
            "vale ya le veo el sentido a la causa",
            "perfecto explicacion recibido y entendido",
            "ok me sirve la aclaracion del motivo",
            "vale ya entiendo de donde viene la razon",
            "perfecto resuelta la duda del por que",
            "ok me quedo conforme con esa causa",
            "vale gracias por la info del motivo",
            "perfecto ahora entiendo el por que perfectamente",
            "ok apuntada la explicacion de la causa",
            "vale todo aclarado sobre el por que gracias",
            "perfecto directo al grano con el motivo",
            "ok entiendo la causa de la duda perfectamente"
        ],
        regular: [
            "mucho testo pero creo q algo entendi de la razon",
            "bueno provaremos ese motivo a ver si es por eso",
            "ok de momento me sirve esa respuesta",
            "un poco liosa la explicacion pero me vale",
            "bueno aceptamos pulpo como explicacion de por que pasa",
            "ok me quedo a medias con el motivo pero probare",
            "vale algo he pescado de la causa gracias",
            "un poco raro el motivo pero te hare caso",
            "bueno creo que entiendo por donde vas",
            "ok me sirve a medias luego lo miro mejor",
            "bueno a ver si es verdad que esa es la razon",
            "un poco extraña la explicacion del por que",
            "ok me lo apunto aunque la causa me suena rara",
            "bueno se intenta comprender el motivo",
            "un poco largo el texto de la explicacion",
            "ok aceptamos esa razon por ahora",
            "bueno algo de sentido tiene el por que",
            "un poco confusa la causa pero me vale",
            "ok pillo la idea del motivo a medias",
            "bueno probaremos con esa explicacion",
            "un poco lioso el por que de las cosas",
            "ok me quedo con esa razon de momento",
            "bueno algo es algo con el motivo",
            "un poco raro el por que pero vale",
            "ok me sirve para hacerme una idea de la causa",
            "bueno aceptable la explicacion del motivo",
            "un poco liado el asunto de la razon",
            "ok me guardo la respuesta del por que",
            "bueno a ver si me cuadra el motivo luego",
            "un poco de lio con la causa pero ok",
            "ok de momento me quedo con esa explicacion",
            "bueno se agradece el intento de dar el motivo",
            "un poco extraño el por que de esto",
            "ok lo dejamos como motivo aceptable",
            "bueno me conformo con esa razon por ahora",
            "un poco lioso el motivo pero gracias",
            "ok pillo el por que mas o menos",
            "bueno habra que creerse ese motivo",
            "un poco confuso el asunto del por que",
            "ok anoto la causa aunque sigo con dudas",
            "bueno me sirve la explicacion por encima",
            "un poco raro el motivo que me das",
            "ok acepto la razon de momento",
            "bueno algo he entendido del por que",
            "un poco liosa la causa de la duda",
            "ok me sirve esa explicacion a medias",
            "bueno tomaremos ese motivo como valido",
            "un poco de texto de mas para la razon",
            "ok pillo la idea del por que de esto",
            "bueno me quedo con ese motivo por ahora"
        ],
        malo: [
            "vaya respuesta... eso no aclara nada de por que pasa",
            "no me convence lo que dices seguro que la razon es otra",
            "ia rota no sabes dar explicaciones coherentes",
            "pero que dices si eso no explica el motivo de mi duda",
            "vaya explicacion de mielda no das una",
            "eso es mentira lo buscare en google original a ver",
            "no tienes sentido comun explicando las causas",
            "ia estropeada no me has aclarado el por que",
            "para decir esa tonteria mejor no digas nada",
            "menudo lio de respuesta no explica absolutamente nada",
            "vaya respuesta mala sobre el por que de las cosas",
            "ia rota no das una explicacion con sentido",
            "eso no responde al por que de mi pregunta",
            "menuda inventada de motivo te has marcado",
            "ia de mielda menudo lio para no explicar la razon",
            "eso no tiene sentido con el por que de la duda",
            "vaya explicacion mas absurda de la causa",
            "no me as aclarado el motivo para nada",
            "ia estropeada vaya forma de explicar el por que",
            "eso que dices no tiene logica con la causa",
            "vaya respuesta de mielda sobre el motivo",
            "ia rota no sabes ni por que pasa eso",
            "menuda tonteria de explicacion de la causa",
            "eso es mentira mi primo dice otra razon",
            "ia estropeada no me sirve ese por que",
            "vaya desastre de respuesta sobre el motivo",
            "eso no aclara la razon de lo que pregunto",
            "ia rota de mielda vaya explicacion",
            "pero que dices loco eso no es el por que",
            "menuda respuesta mas mala sobre la causa",
            "eso no explica el por que de ninguna manera",
            "ia estropeada vaya invento de motivo",
            "vaya mielda de explicacion de las causas",
            "eso no tiene logica con el por que real",
            "ia rota dejas mucho que desear explicando",
            "menudo lio de respuesta no aclara el por que",
            "eso es mentira total sobre la razon de esto",
            "ia estropeada vaya contestacion del motivo",
            "vaya respuesta absurda sobre el por que",
            "eso no me ayuda a entender la causa",
            "ia rota paso de tu explicacion de mielda",
            "menuda tonteria de respuesta sobre el por que",
            "eso no tiene nada que ver con la razon",
            "ia estropeada vaya lio de motivo",
            "vaya contestacion mas mala sobre la causa",
            "eso no aclara el por que de la duda",
            "ia rota no sabes ni dar un motivo",
            "menuda explicacion mas absurda del por que",
            "eso es mentira lo mires por donde lo mires",
            "ia de mielda dejas el por que sin explicar"
        ]
    },
    como: {
        excelente: [
            "perfecto voy a intentar hacer esos pasos",
            "ok anotado el proceso gracias ia",
            "vale ya se como se hace paso a paso",
            "guia perfecta esta tarde mismo pruebo el truco",
            "buen tutorial paso a paso gracias de verdad",
            "ok me viene genial el metodo para hacerlo",
            "perfecto ya tengo las instrucciones claras",
            "vale me has solucionado el como hacerlo",
            "anotados todos los pasos a seguir gracias",
            "asi da gusto directo al grano con las instrucciones",
            "vale ya se el metodo para resolver el como",
            "perfecto instrucciones anotadas para hacerlo",
            "ok entendi el proceso de como se hace",
            "vale buena guia paso a paso gracias ia",
            "perfecto me sirve mucho el metodo de hacer esto",
            "ok anotadas las instrucciones gracias de verdad",
            "vale ya tengo los pasos claros para hacerlo",
            "perfecto tutorial muy util para el proceso",
            "ok entendi como va el truco gracias",
            "vale gracias por decirme como se hace",
            "perfecto anotados los pasos a seguir",
            "ok me viene de locos el proceso para hacerlo",
            "vale instrucciones entendidas perfectamente",
            "perfecto ya se como va el tema gracias",
            "ok guia excelente para saber como se hace",
            "vale me sirve el proceso de fabricacion",
            "perfecto anotado el truco paso por paso",
            "ok entendi los pasos para lograrlo gracias",
            "vale buena explicacion de como hacerlo",
            "perfecto resuelta la duda de como se hace",
            "ok me guardo los pasos para el proceso",
            "vale gracias por la guia de como hacerlo",
            "perfecto pasos claros y directos gracias",
            "ok entendi la forma de hacerlo perfectamente",
            "vale anotado el metodo de resolucion",
            "perfecto instrucciones recibidas de diez",
            "ok ya se la forma de hacerlo gracias ia",
            "vale buena explicacion del proceso a seguir",
            "perfecto me queda claro como es el truco",
            "ok apuntado el metodo de como hacerlo",
            "vale gracias por aclararme los pasos",
            "perfecto guia entendida de principio a fin",
            "ok me sirve el proceso paso a paso",
            "vale ya se el truco de como se hace",
            "perfecto instrucciones asimiladas gracias",
            "ok buen metodo para llevarlo a cabo",
            "vale anotada la forma de hacerlo de locos",
            "perfecto me has solucionado el proceso entero",
            "ok entendi los pasos a la primera gracias",
            "vale ya tengo la guia de como se hace"
        ],
        regular: [
            "bueno provaremos a ver si me sale con eso",
            "mucho proceso no se si sabre hacerlo",
            "ok me lo apunto aunque lo veo dificil",
            "bueno a ver si me sale el truco que me has dado",
            "parece un poco lioso de hacer pero se intentara",
            "ok me guardo los pasos a ver si no rompo nada",
            "un poco rara la manera de hacerlo pero vale",
            "bueno probare ese metodo por probar algo",
            "muchas instrucciones para mi cabeza pero ok",
            "vale lo intentare hacer asi luego te cuento",
            "bueno a ver si me sale el proceso ese",
            "un poco complicado el metodo de hacerlo",
            "ok me apunto los pasos aunque los veo raros",
            "bueno probaremos la forma que me dices",
            "un poco lioso el tutorial para hacerlo",
            "ok de momento me guardo el metodo",
            "bueno algo es algo con las instrucciones",
            "un poco extraña la forma de hacerlo",
            "ok pillo la idea de como se hace a medias",
            "bueno se intentara seguir ese proceso",
            "un poco liosas las instrucciones de hacer esto",
            "ok me quedo con esos pasos de momento",
            "bueno a ver si me sale el truco luego",
            "un poco raro el proceso para lograrlo",
            "ok me sirve para hacerme una idea de como va",
            "bueno aceptable el metodo de hacer las cosas",
            "un poco liado el asunto de los pasos",
            "ok me apunto la forma de hacerlo por si acaso",
            "bueno a ver si funciona el truco ese",
            "un poco de lio con el proceso pero ok",
            "ok de momento pruebo con esos pasos",
            "bueno se agradece el intento de guia",
            "un poco extraño el metodo de hacerlo",
            "ok lo dejamos como pasos aceptables",
            "bueno me conformo con ese proceso por ahora",
            "un poco liosas las instrucciones pero gracias",
            "ok pillo como se hace mas o menos",
            "bueno habra que probar esa forma de hacer",
            "un poco confuso el asunto de los pasos",
            "ok anoto el proceso aunque sigo con dudas",
            "bueno me sirve el metodo por encima",
            "un poco raro el truco que me das",
            "ok acepto los pasos de momento",
            "bueno algo he entendido de como se hace",
            "un poco lioso el tutorial de la duda",
            "ok me sirve esa guia a medias",
            "bueno tomaremos esos pasos como validos",
            "un poco de texto de mas para el proceso",
            "ok pillo la idea de como hacerlo",
            "bueno me quedo con ese metodo por ahora"
        ],
        malo: [
            "no sirve no me as ayudado a solucionarlo",
            "menuda respuesta asi no se hace ni de coña",
            "ia rota no sabes dar instrucciones de como hacerlo",
            "vaya tutorial de mielda he seguido los pasos y casi la lio",
            "asi no se hace que lo mire yo en un video de internet",
            "no me has ayudado nada sigo sin saber como se hace",
            "vaya instrucciones mas malas no se entiende el proceso",
            "ia rota no sabes guiar a un humano",
            "paso de tus instrucciones no tienen ningun sentido",
            "menudo desastre de pasos me has dejado igual",
            "vaya respuesta mala sobre como hacer las cosas",
            "ia rota no das un tutorial con sentido",
            "eso no responde a como se hace lo que pregunto",
            "menuda inventada de pasos te has marcado",
            "ia de mielda menudo lio de instrucciones malas",
            "eso no tiene sentido con el metodo de hacerlo",
            "vaya forma mas absurda de intentar hacerlo",
            "no me as aclarado los pasos para nada",
            "ia estropeada vaya forma de decir como se hace",
            "eso que dices no tiene logica con el proceso",
            "vaya respuesta de mielda sobre el truco",
            "ia rota no sabes ni como se hace eso",
            "menuda tonteria de pasos para lograrlo",
            "eso es mentira mi primo dice que se hace de otra forma",
            "ia estropeada no me sirve ese metodo",
            "vaya desastre de instrucciones para el proceso",
            "eso no aclara como hacerlo de ninguna manera",
            "ia rota de mielda vaya tutorial",
            "pero que dices loco asi no se hace",
            "menuda respuesta mas mala sobre los pasos",
            "eso no explica como se hace ni de lejos",
            "ia estropeada vaya invento de proceso",
            "vaya mielda de instrucciones a seguir",
            "eso no tiene logica con el metodo real",
            "ia rota dejas mucho que desear guiando",
            "menudo lio de respuesta no aclara como hacerlo",
            "eso es mentira total sobre la forma de hacer esto",
            "ia estropeada vaya contestacion de pasos",
            "vaya respuesta absurda de como se hace",
            "eso no me ayuda a entender el proceso",
            "ia rota paso de tus instrucciones de mielda",
            "menuda tonteria de respuesta de como hacerlo",
            "eso no tiene nada que ver con los pasos reales",
            "ia estropeada vaya lio de metodo",
            "vaya contestacion mas mala sobre el proceso",
            "eso no aclara los pasos de la duda",
            "ia rota no sabes ni guiar un proceso",
            "menuda forma mas absurda de decir como se hace",
            "eso es mentira lo mires por donde lo mires",
            "ia de mielda dejas el proceso sin explicar"
        ]
    },
    que: {
        excelente: [
            "ok ya me queda claro que es gracias",
            "gracias por la definicion ia de soporte",
            "perfecto aclarada la duda de lo que significa",
            "vale buena definicion no tenia ni idea",
            "perfecto ya se que significa ese concepto",
            "ok aclarado el significado gracias",
            "buena respuesta al grano con lo que es",
            "now si que se que es eso exactamente",
            "vale me sirve la definicion guardada",
            "ok entendido el significado a la primera",
            "vale gracias por aclararme que significa",
            "perfecto me queda clarisimo el concepto de eso",
            "ok entiendo perfectamente que es gracias ia",
            "ahora si que me cuadra el significado de todo",
            "vale buena definicion directo a la palabra",
            "perfecto duda resuelta sobre lo que es gracias",
            "ok me dejas mucho mas conforme con ese concepto",
            "vale ya pillo el significado de la cuestion",
            "perfecto definicion de diez sobre lo que es",
            "ok gracias por detallarme el concepto asi",
            "vale ya entiendo la logica de que significa",
            "perfecto me sirve mucho saber que es",
            "ok duda aclarada con el significado de esto",
            "vale anotado el concepto gracias de verdad",
            "perfecto ahora tiene todo el sentido la definicion",
            "ok ya entiendo la explicacion de lo que significa",
            "vale gracias por decirme que es exactamente",
            "perfecto me aclara mucho esa definicion el concepto",
            "ok entiendo el trasfondo de lo que significa gracias",
            "vale ya no tengo dudas con el concepto de eso",
            "perfecto me ha servido la explicacion de que es",
            "ok anotado el significado para la proxima",
            "vale ya se que significa la cuestion",
            "perfecto muy buena respuesta sobre el concepto",
            "ok entiendo que es de primeras gracias",
            "vale aclarado el asunto de que es eso",
            "perfecto me dejas mas tranquilo con el significado",
            "ok gracias por resolverme que significa esto",
            "vale ya le veo el sentido al concepto",
            "perfecto definicion recibida y entendida",
            "ok me sirve la aclaracion de lo que significa",
            "vale ya entiendo de donde viene el concepto",
            "perfecto resuelta la duda de que significa",
            "ok me quedo conforme con ese concepto",
            "vale gracias por la info de lo que es",
            "perfecto ahora entiendo que significa perfectamente",
            "ok apuntada la explicacion de que es eso",
            "vale todo aclarado sobre el significado gracias",
            "perfecto directo al grano con el concepto",
            "ok entiendo que es la duda perfectamente"
        ],
        regular: [
            "un poco raro eso que dices pero ok",
            "bueno provaremos a ver si es verdad lo que dices",
            "ok no sabia que contestabas eso",
            "bueno me suena un poco a chino pero me vale",
            "un poco extraña esa definicion pero aceptamos pulpo",
            "ok me quedo con el concepto a medias",
            "vale me sirve para hacerme una idea de que es",
            "un poco lioso lo que significa pero ok",
            "bueno algo es algo gracias por decirme que es",
            "ok me lo apunto aunque me suena raro",
            "bueno a ver si es verdad que significa eso",
            "un poco extraña la explicacion del concepto",
            "ok me lo apunto aunque lo que es me suena raro",
            "bueno se intenta comprender el significado",
            "un poco largo el texto de la definicion",
            "ok aceptamos ese concepto por ahora",
            "bueno algo de sentido tiene lo que significa",
            "un poco confusa la definicion pero me vale",
            "ok pillo la idea de que es a medias",
            "bueno probaremos con esa definicion de que es",
            "un poco lioso el concepto de las cosas",
            "ok me quedo con ese significado de momento",
            "bueno algo es algo con la definicion",
            "un poco raro el concepto pero vale",
            "ok me sirve para hacerme una idea de que significa",
            "bueno aceptable la definicion del concepto",
            "un poco liado el asunto de lo que es",
            "ok me guardo la respuesta del significado",
            "bueno a ver si me cuadra el concepto luego",
            "un poco de lio con lo que significa pero ok",
            "ok de momento me quedo con esa definicion",
            "bueno se agradece el intento de definicion",
            "un poco extraño el concepto de esto",
            "ok lo dejamos como significado aceptable",
            "bueno me conformo con ese concepto por ahora",
            "un poco liosa la definicion pero gracias",
            "ok pillo que significa mas o menos",
            "bueno habra que creerse ese concepto",
            "un poco confuso el asunto de la definicion",
            "ok anoto el significado aunque sigo con dudas",
            "bueno me sirve el concepto por encima",
            "un poco raro lo que significa que me das",
            "ok acepto el concepto de momento",
            "bueno algo he entendido de que es eso",
            "un poco lioso el concepto de la duda",
            "ok me sirve esa definicion a medias",
            "bueno tomaremos ese concepto como valido",
            "un poco de texto de mas para la definicion",
            "ok pillo la idea de que significa esto",
            "bueno me quedo con ese concepto por ahora"
        ],
        malo: [
            "menuda troleada eso no significa eso ni de coña",
            "ia rota de mielda vaya definicion me acabas de dar",
            "pero que dices si eso no tiene sentido con lo que es",
            "eso es mentira lo buscare en wikipedia que se enteran mas",
            "vaya definicion mas mala no tiene nada que ver",
            "ia estropeada no sabes ni definir un concepto facil",
            "pero que dices loco eso no significa eso ni de lejos",
            "menuda respuesta de mielda me has dejado mas confundido",
            "deja de inventar definiciones ia rota",
            "eso no significa eso te has quedado a gusto con la inventada",
            "vaya respuesta mala sobre que significan las cosas",
            "ia rota no das una definicion con sentido",
            "eso no responde a que significa lo que pregunto",
            "menuda inventada de concepto te has marcado",
            "ia de mielda menudo lio de definicion mala",
            "eso no tiene sentido con lo que significa la duda",
            "vaya explicacion mas absurda de lo que es",
            "no me as aclarado el concepto para nada",
            "ia estropeada vaya forma de definir que significa",
            "eso que dices no tiene logica con el concepto",
            "vaya respuesta de mielda sobre el significado",
            "ia rota no sabes ni que significa eso",
            "menuda tonteria de definicion del concepto",
            "eso es mentira mi primo dice que significa otra cosa",
            "ia estropeada no me sirve ese concepto",
            "vaya desastre de definicion para lo que es",
            "eso no aclara que significa de ninguna manera",
            "ia rota de mielda vaya explicacion de que es",
            "pero que dices loco eso no es el concepto",
            "menuda respuesta mas mala sobre el significado",
            "eso no explica que significa ni de lejos",
            "ia estropeada vaya invento de definicion",
            "vaya mielda de explicacion sobre lo que es",
            "eso no tiene logica con el concepto real",
            "ia rota dejas mucho que desear definiendo",
            "menudo lio de respuesta no aclara que significa",
            "eso es mentira total sobre lo que es esto",
            "ia estropeada vaya contestacion de definicion",
            "vaya respuesta absurda de que significa",
            "eso no me ayuda a entender el concepto",
            "ia rota paso de tu definicion de mielda",
            "menuda tonteria de respuesta de lo que significa",
            "eso no tiene nada que ver con el concepto real",
            "ia estropeada vaya lio de definicion",
            "vaya contestacion mas mala sobre lo que significa",
            "eso no aclara el concepto de la duda",
            "ia rota no sabes ni dar una definicion",
            "menuda forma mas absurda de decir que es",
            "eso es mentira lo mires por donde lo mires",
            "ia de mielda dejas el concepto sin explicar"
        ]
    },
    general: {
        excelente: [
            "ok entendi todo genial gracias ia",
            "perfecto me sirve un monton la respuesta",
            "vale ya me cuadra todo lo que dices",
            "gracias por la ayuda solucionado",
            "ok perfecto eres una ia genial",
            "vale me dejas mas tranquilo con el tema",
            "de locos la respuesta gracias ia",
            "perfecto todo aclarado por hoy",
            "ok anotado todo gracias de verdad",
            "vale me sirve perfectamente el mensaje",
            "vale gracias por aclararme la duda entera",
            "perfecto me queda clarisima la respuesta",
            "ok entiendo perfectamente todo gracias ia",
            "ahora si que me cuadra la solucion",
            "vale buena respuesta directo al tema",
            "perfecto duda resuelta sobre esto gracias",
            "ok me dejas mucho mas conforme con la ayuda",
            "vale ya pillo la solucion de la cuestion",
            "perfecto respuesta de diez sobre mi consulta",
            "ok gracias por detallarme el asunto asi",
            "vale ya entiendo la logica de la respuesta",
            "perfecto me sirve mucho saber la solucion",
            "ok duda aclarada con lo que me pones",
            "vale anotado todo gracias de verdad ia",
            "perfecto ahora tiene todo el sentido el tema",
            "ok ya entiendo la explicacion de la duda",
            "vale gracias por decirme la solucion exacta",
            "perfecto me aclara mucho esa respuesta todo",
            "ok entiendo el trasfondo de la consulta gracias",
            "vale ya no tengo dudas con el tema de eso",
            "perfecto me ha servido la respuesta del chat",
            "ok anotada la ayuda para la proxima",
            "vale ya se la solucion de la cuestion",
            "perfecto muy buena respuesta sobre mi consulta",
            "ok entiendo el asunto de primeras gracias",
            "vale aclarado el tema entero de la duda",
            "perfecto me dejas mas tranquilo con la ayuda",
            "ok gracias por resolverme la duda de esto",
            "vale ya le veo el sentido a la respuesta",
            "perfecto solucion recibida y entendida",
            "ok me sirve la aclaracion de la consulta",
            "vale ya entiendo de donde viene la respuesta",
            "perfecto resuelta la duda por hoy gracias",
            "ok me quedo conforme con esa respuesta",
            "vale gracias por la info de la consulta",
            "perfecto ahora entiendo todo perfectamente",
            "ok apuntada la explicacion de la duda",
            "vale todo aclarado sobre el tema gracias",
            "perfecto directo al grano con la respuesta",
            "ok entiendo el mensaje de la duda perfectamente"
        ],
        regular: [
            "bueno provaremos a ber si funsiona",
            "ok me sirve de momento",
            "un poco raro pero se intenta",
            "mucho testo pero algo he pescado gracias",
            "bueno a ver si es verdad y funciona",
            "ok lo dejamos asi por ahora",
            "un poco extraño el mensaje pero ok",
            "bueno me lo apunto por si acaso",
            "ok gracias supongo a ver que pasa",
            "vale lo dejamos como respuesta aceptable",
            "bueno a ver si me sirve esa ayuda luego",
            "un poco extraña la contestacion de la duda",
            "ok me lo apunto aunque me suena un poco raro",
            "bueno se intenta comprender el mensaje",
            "un poco largo el texto de la respuesta",
            "ok aceptamos esa respuesta por ahora",
            "bueno algo de sentido tiene lo que pones",
            "un poco confusa la ayuda pero me vale",
            "ok pillo la idea de la respuesta a medias",
            "bueno probaremos con esa solucion",
            "un poco lioso el mensaje de las cosas",
            "ok me quedo con esa respuesta de momento",
            "bueno algo es algo con la ayuda",
            "un poco raro el mensaje pero vale",
            "ok me sirve para hacerme una idea del tema",
            "bueno aceptable la respuesta de la consulta",
            "un poco liado el asunto del mensaje",
            "ok me guardo la contestacion de la duda",
            "bueno a ver si me cuadra la respuesta luego",
            "un poco de lio con la solucion pero ok",
            "ok de momento me quedo con esa ayuda",
            "bueno se agradece el intento de respuesta",
            "un poco extraño el mensaje de esto",
            "ok lo dejamos como respuesta pasable",
            "bueno me conformo con esa ayuda por ahora",
            "un poco liosa la respuesta pero gracias",
            "ok pillo la solucion mas o menos",
            "bueno habra que creerse esa respuesta",
            "un poco confuso el asunto del mensaje",
            "ok anoto la respuesta aunque sigo con dudas",
            "bueno me sirve la ayuda por encima",
            "un poco raro el mensaje que me das",
            "ok acepto la respuesta de momento",
            "bueno algo he entendido de la consulta",
            "un poco lioso el mensaje de la duda",
            "ok me sirve esa respuesta a medias",
            "bueno tomaremos esa ayuda como valida",
            "un poco de texto de mas para el mensaje",
            "ok pillo la idea de la respuesta de esto",
            "bueno me quedo con esa solucion por ahora"
        ],
        malo: [
            "no sirve para nada, no me as ayudado con la duda",
            "vaya respuesta de mielda, te has quedado a gusto",
            "ia rota kiero hablar con un humano",
            "para poner eso mejor no respondas nada",
            "ia estropeada vaya contestacion mas absurda",
            "eso que dices no tiene ningun tipo de sentido",
            "menudo troleo de respuesta paso de ti",
            "no me has solucionado nada sigo con el problema",
            "ia de mielda no das una con mis consultas",
            "vaya timo de ia no sabes responder a un humano",
            "vaya respuesta mala sobre la duda de las cosas",
            "ia rota no das una contestacion con sentido",
            "eso no responde a lo que pregunto en el chat",
            "menuda inventada de respuesta te has marcado",
            "ia de mielda menudo lio de contestacion mala",
            "eso no tiene sentido con lo que es mi duda",
            "vaya mensaje mas absurdo me acabas de dar",
            "no me as aclarado la consulta para nada",
            "ia estropeada vaya forma de responder a un humano",
            "eso que dices no tiene logica con el tema",
            "vaya respuesta de mielda de soporte",
            "ia rota no sabes ni que contestar a eso",
            "menuda tonteria de respuesta para la duda",
            "vaya contestacion mas incoherente me has puesto",
            "ia estropeada no me sirve esa respuesta",
            "vaya desastre de mensaje para la consulta",
            "eso no aclara mi duda de ninguna manera",
            "ia rota de mielda vaya contestacion",
            "pero que dices loco eso no responde a nada",
            "menuda respuesta mas mala me acabas de poner",
            "eso no explica la duda ni de lejos",
            "ia estropeada vaya invento de contestacion",
            "vaya mielda de respuesta a mi consulta",
            "eso no tiene logica con el asunto real",
            "ia rota dejas mucho que desear respondiendo",
            "menudo lio de respuesta no aclara la duda",
            "eso es mentira total sobre lo que pasa con esto",
            "ia estropeada vaya mensaje de soporte",
            "vaya respuesta absurda me acabas de dar",
            "eso no me ayuda a solucionar la duda",
            "ia rota paso de tu mensaje de mielda",
            "menuda tonteria de respuesta a la consulta",
            "eso no tiene nada que ver con lo que pregunto",
            "ia estropeada vaya lio de respuesta",
            "vaya contestacion mas mala sobre la consulta",
            "eso no aclara el asunto de la duda",
            "ia rota no sabes ni dar una respuesta",
            "menuda forma mas absurda de contestar a esto",
            "eso es mentira lo mires por donde lo mires",
            "ia de mielda dejas la duda sin responder"
        ]
    }
};

let REACCIONES_ELGOOG = { excelente: [], regular: [], malo: [] };

// --- ESTADO ---
let gameState = {
    score: parseInt(localStorage.getItem('elgoog_score')) || 0,
    roundStep: 1,
    currentQuestion: "",
    campaignIndex: parseInt(localStorage.getItem('elgoog_campaign_index')) || 0, 
    inInfiniteMode: localStorage.getItem('elgoog_infinite_mode') === 'true', 
    satisfaction: parseInt(localStorage.getItem('elgoog_satisfaction')) || 50,
    level: parseInt(localStorage.getItem('elgoog_level')) || 1,
    currentUser: null,
    history: JSON.parse(localStorage.getItem('elgoog_history')) || []
};

// --- ELEMENTOS DEL DOM ---
let authScreen, mainApp, authForm, loggedUserName, chatMessages, userInput, chatForm, sendBtn;
let totalScoreEl, playerLevelEl, satisfactionBar, elgoogOpinion, elgoogStatus, historyLog, suggestionBox;

window.addEventListener('DOMContentLoaded', () => {
    authScreen = document.getElementById('auth-screen');
    mainApp = document.getElementById('main-app');
    authForm = document.getElementById('auth-form');
    loggedUserName = document.getElementById('logged-user-name');
    chatMessages = document.getElementById('chat-messages');
    userInput = document.getElementById('user-input');
    chatForm = document.getElementById('chat-form');
    sendBtn = document.getElementById('send-btn');
    totalScoreEl = document.getElementById('total-score');
    playerLevelEl = document.getElementById('player-level');
    satisfactionBar = document.getElementById('satisfaction-bar');
    elgoogOpinion = document.getElementById('elgoog-opinion');
    elgoogStatus = document.getElementById('elgoog-status');
    historyLog = document.getElementById('history-log');
    suggestionBox = document.getElementById('suggestion-box');

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('auth-username').value.trim();
            if (username) {
                localStorage.setItem('elgoog_user', username);
                loginUser(username);
            }
        });
    }

    if (suggestionBox) {
        suggestionBox.addEventListener('click', acceptSuggestion);
    }

    const savedUser = localStorage.getItem('elgoog_user');
    if (savedUser) {
        loginUser(savedUser);
    } else {
        if (authScreen) authScreen.style.display = "flex";
        if (mainApp) mainApp.style.display = "none";
    }
});

function loginUser(username) {
    gameState.currentUser = username;
    if (loggedUserName) loggedUserName.innerText = username;
    
    if (authScreen) authScreen.style.display = "none";
    if (mainApp) mainApp.style.display = "flex"; 
    
    renderHistory();
    updateSidebarUI();
    
    if (chatForm) {
        chatForm.onsubmit = handleUserResponse;
    }
    
    setTimeout(() => { nextRound(); }, 500);
}

function getNextQuestion() {
    if (gameState.campaignIndex < PREGUNTAS_CAMPAÑA.length) {
        return PREGUNTAS_CAMPAÑA[gameState.campaignIndex];
    }
    if (!gameState.inInfiniteMode) {
        gameState.inInfiniteMode = true;
        localStorage.setItem('elgoog_infinite_mode', 'true');
        appendMessage('system', '⚠️ MODO INICIAL COMPLETADO: INCORPORANDO GENERADOR INFINITO DE CONSULTAS...');
    }
    const tipos = ['problema', 'concepto', 'sintoma'];
    const tipoElegido = tipos[Math.floor(Math.random() * tipos.length)];
    switch (tipoElegido) {
        case 'problema': return `porque no funciona ${GENERADOR_TEMAS.problemas[Math.floor(Math.random() * GENERADOR_TEMAS.problemas.length)]}`;
        case 'concepto': return `que es ${GENERADOR_TEMAS.conceptos[Math.floor(Math.random() * GENERADOR_TEMAS.conceptos.length)]}`;
        case 'sintoma': return `como curar ${GENERADOR_TEMAS.sintomas[Math.floor(Math.random() * GENERADOR_TEMAS.sintomas.length)]}`;
    }
}

function nextRound(forcedQuestion = null) {
    gameState.roundStep = 1;
    
    if (userInput) {
        userInput.disabled = true;
        userInput.value = "";
        userInput.placeholder = "Elgoog está escribiendo...";
    }
    if (sendBtn) sendBtn.disabled = true;
    if (elgoogStatus) elgoogStatus.innerText = "Escribiendo...";
    
    setTimeout(() => {
        gameState.currentQuestion = forcedQuestion ? forcedQuestion : getNextQuestion();
        appendMessage('elgoog', gameState.currentQuestion);
        
        const qLower = gameState.currentQuestion.toLowerCase();
        if (qLower.startsWith("porque") || qLower.startsWith("xq")) {
            REACCIONES_ELGOOG = REACCIONES_POR_TIPO.porque;
        } else if (qLower.startsWith("como")) {
            REACCIONES_ELGOOG = REACCIONES_POR_TIPO.como;
        } else if (qLower.startsWith("que")) {
            REACCIONES_ELGOOG = REACCIONES_POR_TIPO.que;
        } else {
            REACCIONES_ELGOOG = REACCIONES_POR_TIPO.general;
        }
        
        let timeLeft = 5;
        if (userInput) userInput.placeholder = `🧠 REFLEXIÓN OBLIGATORIA... (${timeLeft}s)`;
        if (elgoogStatus) elgoogStatus.innerText = "Analizando petición humana...";

        const countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                if (userInput) userInput.placeholder = `🧠 REFLEXIÓN OBLIGATORIA... (${timeLeft}s)`;
            } else {
                clearInterval(countdown);
                
                gameState.roundStep = 2;
                if (userInput) {
                    userInput.disabled = false;
                    userInput.placeholder = "Escribe tu respuesta como una IA profesional...";
                    try { userInput.focus(); } catch(e) {}
                }
                if (sendBtn) sendBtn.disabled = false;
                if (elgoogStatus) elgoogStatus.innerText = "Esperando respuesta...";
            }
        }, 1000);

    }, 1000);
}

function handleUserResponse(e) {
    e.preventDefault();
    if (!userInput) return;
    const text = userInput.value.trim();
    
    if (!text || gameState.roundStep !== 2) return;

    gameState.roundStep = 3;
    userInput.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
    userInput.value = "";

    appendMessage('ai', text);
    
    const pointsEarned = evaluateResponse(text);
    gameState.score += pointsEarned;
    updateSatisfaction(pointsEarned);
    
    saveToHistory(gameState.currentQuestion, text, pointsEarned);

    if (!gameState.inInfiniteMode && (!suggestionBox || !suggestionBox.dataset.activeSuggestion)) {
        gameState.campaignIndex++;
        localStorage.setItem('elgoog_campaign_index', gameState.campaignIndex);
    }
    if (suggestionBox) delete suggestionBox.dataset.activeSuggestion;

    if (elgoogStatus) elgoogStatus.innerText = "Escribiendo...";

    setTimeout(() => {
        let pool = REACCIONES_ELGOOG.regular;
        if (pointsEarned >= 7) pool = REACCIONES_ELGOOG.excelente;
        if (pointsEarned <= 3) pool = REACCIONES_ELGOOG.malo;
        
        const reaccion = pool[Math.floor(Math.random() * pool.length)];
        appendMessage('elgoog', reaccion);
        
        if (elgoogStatus) elgoogStatus.innerText = "Conectado";
        
        localStorage.setItem('elgoog_score', gameState.score);
        localStorage.setItem('elgoog_satisfaction', gameState.satisfaction);
        localStorage.setItem('elgoog_level', gameState.level);
        
        updateSidebarUI();

        if (gameState.inInfiniteMode && Math.random() < 0.30) {
            triggerSuggestion();
        } else {
            appendMessage('system', '--- FIN DE LA RONDA: GENERANDO NUEVA BÚSQUEDA ---');
            setTimeout(nextRound, 1500);
        }
    }, 1500);
}

function evaluateResponse(text) {
    let score = 0;
    const lower = text.toLowerCase();

    if (text.length > 30) score += 2;
    if (text.length > 80) score += 2;
    if (lower.includes("estimado usuario") || lower.includes("siento") || lower.includes("procesando")) score += 2;
    if (lower.includes("porque") || lower.includes("debido") || lower.includes("consiste")) score += 2;

    if (text.length < 12 || lower.includes("jajaja") || lower.includes("xd")) score -= 3;

    return Math.max(0, Math.min(10, score));
}

function triggerSuggestion() {
    if (!suggestionBox) return;
    const sugerencias = ["porque internet se rompe", "como saber si una pagina es falsa", "mi ordenador hace ruido de cafetera ayuda"];
    const elegida = sugerencias[Math.floor(Math.random() * sugerencias.length)];
    suggestionBox.innerHTML = `🎬 <strong>Recomendación para Elgoog:</strong> "${elegida}" (Clic para forzar en la red)`;
    suggestionBox.style.display = "block";
    suggestionBox.dataset.pendingQuestion = elegida;
}

function acceptSuggestion() {
    if (!suggestionBox) return;
    const nextQ = suggestionBox.dataset.pendingQuestion;
    suggestionBox.style.display = "none";
    suggestionBox.dataset.activeSuggestion = "true";
    appendMessage('system', '--- REDIRECCIONANDO AL HUMANO POR ENLACE ---');
    nextRound(nextQ);
}

function updateSatisfaction(points) {
    const diff = points - 5;
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + (diff * 4)));
    if (gameState.score > 20 && gameState.score <= 50) gameState.level = 2;
    if (gameState.score > 50) gameState.level = 3;
}

function updateSidebarUI() {
    if (totalScoreEl) totalScoreEl.innerText = gameState.score;
    if (satisfactionBar) satisfactionBar.innerText = `${gameState.satisfaction}%`;
    let opinion = "indiferente";
    if (gameState.satisfaction > 75) opinion = "te ama / te reza";
    else if (gameState.satisfaction > 55) opinion = "le sirves";
    else if (gameState.satisfaction < 35) opinion = "quiere romper el router";
    if (elgoogOpinion) elgoogOpinion.innerText = opinion;
    const tier = gameState.level === 1 ? "1 (Iniciante)" : gameState.level === 2 ? "2 (Soporte Técnico)" : "3 (Skynet Consciente)";
    if (playerLevelEl) playerLevelEl.innerText = tier;
}

function appendMessage(sender, text) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function saveToHistory(q, a, s) {
    const item = { q, a, score: s };
    gameState.history.unshift(item);
    if (gameState.history.length > 8) gameState.history.pop();
    localStorage.setItem('elgoog_history', JSON.stringify(gameState.history));
    renderHistory();
}

function renderHistory() {
    if (!historyLog) return;
    historyLog.innerHTML = "";
    if (gameState.history.length === 0) return;
    gameState.history.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('history-item');
        div.innerHTML = `<strong>Q:</strong> ${item.q}<br><strong>Score:</strong> ${item.score}/10`;
        historyLog.appendChild(div);
    });
}
