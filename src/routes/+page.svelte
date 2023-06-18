<script lang="ts">
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	const randomNumber = Math.random().toString(30);

const randomString = randomNumber.substr(2, 20);
	import { supabase } from "$lib/supaClient";

	
	
	const carouselPhotos = [
		{
    "Creature": "Book cover",
    "Description": "Title page of the Visboeck. Koninklijke Bibliotheek",
    "Link": "https://www.nioz.nl/application/files/7116/2323/7850/omslag_visboeck.JPG"
  },
  {
    "Creature": "De eenhoorn en olifant",
    "Description": "Zoals de meesten van zijn tijdgenoten is ook Coenen gefascineerd door het monsterlijke. In zijn wereldbeeld hebben wonderbaarlijke wezens vaak een voorspellende betekenis. Het maakte niet uit of het vreemd uitziende, gedrochtelijke, zeldzame of zelfs buitennatuurlijke mensen of dieren zijn. Als de natuur buiten de gewone paden treedt, moet dat wel gebeuren door goddelijk ingrijpen en dus iets betekenen. In de proloog van het Visboeck staan de zeldzame olifant en de wonderbaarlijke eenhoorn gebroederlijk op één afbeelding (rechterpagina). Dit is overigens niet de enige olifant in het Visboeck: elders is een klein plaatje te vinden van een levende olifant die in 1484 in Holland in diverse steden werd tentoongesteld.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_013r.jpg"
  },
  {
    "Creature": "De monstervis (zeekoe)",
    "Description": "Coenen ontleent de afbeeldingen van de twee monstervissen rechts aan het werk van zijn tijdgenoot Conrad Gessner, een beroemde Zwitserse humanist, arts en kenner van de natuur (rechterpagina). De tekst die erbij staat heeft Coenen van de Zweedse geleerde Olaus Magnus en die past niet goed bij de illustraties. De tekst legt uit dat het wilde beesten zijn, echte zeemonsters en de ergste haringdieven van de hele zee. De zeekoe kan vooral gevaarlijk worden wanneer ze haar jongen probeert te beschermen. Tegenwoordig denken we niet meer aan koeien bij de zeekoe, aan leeuwen bij de zeeleeuw, of aan de wolf bij de zeewolf. Maar ooit zagen mensen overeenkomsten tussen het leven boven en onder water en bedachten ze deze namen.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/b/be/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_102r.jpg"
  },
  {
    "Creature": "De monstervis",
    "Description": "Verspreid door het Visboeck besteedt Coenen veel aandacht aan wonderlijke natuurverschijnselen, monsterlijke zeewezens en hun mogelijke voorspellende waarde. De afbeeldingen van zulke monsters ontleent hij vaak aan het werk van de Zweedse bisschop Olaus Magnus. Dat geldt ook voor de monstervis links die in de loop van de jaren 1530 gevangen was in de 'Duitse zee'. Hij heeft een kop en slagtanden als een wild varken, manen in de hals, vier voeten als een draak, een gespleten staart (net als andere vissen), en behalve ogen op de gewone plaats ook ogen aan beide zijden plus een derde oog op de plaats van de navel.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_104r.jpg"
  },
  {
    "Creature": "Boomgansjes",
    "Description": "De boomgans op de rechterpagina is een gans die groeit aan een boom, zo vertelt Coenen. Vanaf de twaalfde eeuw zijn boomganzen zeer zeldzame curiositeiten. Ze komen uit verre noordelijke streken. Als vogel die aan een plant groeit bevindt de boomgans zich tussen de categorieën plant en dier in. Coenen bezat zelf ooit een boomgans: gezouten en wel in een tonnetje. Maar hij raakte deze kwijt toen hij moest vluchten voor Spaanse troepen. Coenens illustraties verwijzen naar de verschillende tradities rond de boomgans. Kleine boomgansjes steken hun kopjes uit de vruchtjes van een boom aan de waterkant. Het verhaal ging dat jonge boomgansjes die uit de dop op de grond vallen nooit tot leven zouden komen. Alleen als ze in het water terechtkwamen konden ze zich ontwikkelen tot echte (boom)ganzen. Andere soorten boomganzen (bernace, denk aan barnacle goose) zouden direct aan de stam van een boom groeien, en nog een derde soort ontwikkelde zich uit rottend hout dat in het water dreef.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_112r.jpg"
  },
  {
    "Creature": "De zeebisschop",
    "Description": "Deze zeebisschop (links) was in 1431 ontdekt bij Polen. Coenen ontleent zijn informatie aan de Grote Kroniek van Holland of Divisiekroniek (Leiden 1517), een werk met een gezaghebbende status in zijn tijd. De zeebisschop heeft een mijter, staf, sloffen, kazuifel, en handschoenen, net als een echte bisschop die zijn ambt uitoefent. En bovendien heeft het wezen een hoofd, ogen, neus, wangen, mond, armen, handen, en voeten, terwijl het toch een levende, koude vis is. Alles welbeschouwd meent Coenen dat dit monster een bewijs is van de wonderlijke werken van God. Hij voegt een eigen gedichtje toe: 'De bisschoppen zijn niet alleen op eerde / Die men hier houdt in grote weerde / Ook groeit in de zee zulke bisschop, een grove bijter / En spreekt niet al draagt hij mijter'.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/5/56/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_185v.jpg"
  },
  {
    "Creature": "De zeemonnik",
    "Description": "De zeemonnik (links) bevindt zich in Coenens Visboeck vlakbij de zeebisschop, wat misschien logisch is gezien hun 'religieuze karakter'. Verder is er geen verband, want deze zeemonnik was kennelijk in de buurt van Noorwegen gevangen en vervolgens aan de koning gestuurd. Zulke vissen waren volgens oudere schrijvers ook gesignaleerd in de zeeën bij Frankrijk en Engeland. Coenen dicht: 'Maar dit is immers een vreemde schijn / Dat in de zee dusdanige monniken zijn'.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_187v.jpg"
  },
  {
    "Creature": "De meermin en meerman",
    "Description": "De allerbekendste wonderlijke zeewezens zijn ook in Coenens tijd de zeemeerminnen en zeemeermannen. Coenen schrijft pagina's vol over hen. Maar hij haalt zijn informatie bij andere auteurs. Het valt hem op dat er over veel soorten zeemensen gesproken wordt: meermannen en meervrouwen, nereïden, tritonen, en sirenen. Zijn eigen toevoegingen klinken vaak nogal sceptisch. Over de meerminnen zegt hij: 'Maar ik kan nog geen mens vinden die ze met zijn eigen ogen gezien heeft tot dezen dag anno 1579'.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/8/89/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_189v.jpg"
  },
  {
    "Creature": "De meermin",
    "Description": "De bekendste meerminnen zijn de sirenen (rechts), die van hoofd tot navel op vrouwen lijken. Ze zijn groot, met een vuil en slijmachtig uiterlijk en lang haar. De onderste helft van hun lichaam lijkt op dat van een arend. Met de klauwen aan hun voeten verscheuren ze hun buit. Ze hebben een met schubben beklede staart. Met hun prachtige zang lokken de sirenen schippers, die door de zang in slaap vallen. Ze worden dan de zee in getrokken en verscheurd door de sirenen, behalve als ze het voorbeeld van Odysseus volgen en hun oren dichtstoppen. Deze angstaanjagende zeemeerminnen lijken absoluut niet op de romantische 'kleine zeemeermin' die we nu kennen.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_190v.jpg"
  },
  {
    "Creature": "De wilde vrouw in de Purmer",
    "Description": "Niet alleen in verre exotische landen maar ook in Holland doen verhalen de ronde over mensen die in zee leven. Ruim vóór Coenens tijd, in 1403, zou een vreemde vrouw zijn aangetroffen in de Purmer - destijds een meer en nog geen polder (linkerpagina). Daar zwom ze rond, overdekt met slijmerige en mosachtige aangroeisels. Ze sliep in het water en zocht er voedsel. Vrouwen uit de omgeving verzamelden moed en trokken deze wilde vrouw met geweld uit het water. Ze werd schoongemaakt en naar Haarlem gebracht, waar ze jarenlang een bezienswaardigheid bleef. Ze leerde normaal voedsel eten en zelfs wol spinnen, maar ze sprak nooit. Coenen ontleent informatie over deze gebeurtenis aan de Grote Kroniek van Holland of Divisiekroniek (Leiden 1517) en denkt dat er dus best iets waar kan zijn van de verhalen over zeemensen in verre vreemde landen.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_193v.jpg"
  },
  {
    "Creature": "De zeearend",
    "Description": "In Coenens tijd denken velen dat er parallellen zijn tussen het leven boven en onder water, op aarde en in de lucht. Die mening heeft duidelijk sporen nagelaten in de namen van allerlei zeewezens, waarvan er vele ook nu nog gebruikt worden. De term zeearend of zeeadelaar wordt in Coenens tijd voor meer dan één soort wezen gebruikt: soms voor zeeschildpadden met een scherpe snavel, soms voor een rogachtige vis die op zijn brede vleugels door het water 'vliegt' (afbeelding op de linkerpagina).",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_200v.jpg"
  },
  {
    "Creature": "Het beest Su",
    "Description": "Het beest rechts is afkomstig uit Patagonië, in het diepe zuiden van Zuid-Amerika. Tussen Patagonië en Vuurland loopt de Straat Magelhaes, waardoor de zestiende-eeuwse ontdekkingsreizigers hun weg zoeken van de Atlantische naar de Stille Oceaan. De bontvacht van het dier Su wordt door de inwoners van dit koude gebied gebruikt als kleding. De naam Su zou in hun taal 'water' betekenen. Het dier woont meestal in de buurt van water, is roofzuchtig en ziet er afschuwelijk uit. Als het door jagers wordt achtervolgd, neemt het zijn jongen op zijn rug, bedekt ze met zijn lange gepluimde staart, en vlucht. Het dier wordt gevangen in gaten in de grond en gedood met pijlen. Coenen ontleent al deze informatie aan de beroemdste dierenencyclopedie van de zestiende eeuw, die geschreven is door de Zwitserse arts en geleerde Conrad Gessner.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/4/44/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_226r.jpg"
  },
  {
    "Creature": "Plinische rassen",
    "Description": "Coenen presenteert in tekst en beeld een hele serie Plinische rassen, de één nog exotischer dan de andere. Ze gaan terug op voorstellingen die al in de klassieke oudheid bestonden. Vanaf de middeleeuwen worden ze vaak afgebeeld op wereldkaarten in de witte, nog niet verkende plekken van de continenten. Het zijn mensen die hoofden hebben als honden en zich kleden met beestenvellen; mensen in de Oriënt die niet eten maar leven van de lucht van appels en bloemen en door een riet drinken omdat ze zo'n kleine mond hebben; mensen zonder neus met een bol gezicht; mensen die onder hun neus lippen hebben die zo lang zijn dat ze daarmee hun gezicht kunnen bedekken; mensen met extreem grote oren die hun hele lichaam kunnen omhullen; mensen die lopen als schapen en horens hebben, met een korte neus en geitenvoeten; mensen met vier ogen in Ethiopië; mensen in Indië met zes vingers aan hun handen en voeten.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/4/40/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_020r.jpg"
  },
  {
    "Creature": "Zeedraken",
    "Description": "Tot de bijzondere wezens die Coenen ontleent aan het Dierenpalleijs behoren ook enkele zeedraken. Deze vertonen een aantal overeenkomsten met hun tegenhangers die op het land leven. De zeedraak links is wreed, vreselijk van uiterlijk en zeer lang. Hij heeft een huid van schubben en een gedraaide staart, maar in tegenstelling tot gewone draken heeft hij geen vleugels. Wel kan hij in een korte tijd een grote afstand overbruggen in het water. Het sap van de alsem schijnt goed te helpen tegen een beet van de zeedraak. Het zeepaard onderaan is eerder wonderlijk dan afschuwelijk van gedaante.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/0/02/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_230r.jpg"
  },
  {
    "Creature": "Een zeepaard bij Delft",
    "Description": "Bij Coenens kindertijd horen spookverhalen, vertelsels over alvers en vreemde watergeesten. En dan is er de spectaculaire verschijning van een woest uitziend zeepaard met lange vooruitstekende tanden (linkerpagina). Dit monster brengt het paard van een man die langs het strand onderweg is in de buurt van Scheveningen in paniek. Coenen speelt op dat moment met andere kinderen uit Scheveningen in de duinen. Tegen de tijd dat de kinderen ter plekke zijn is het zeepaard alweer verdwenen. Maar de eerst gearriveerde dorpelingen hadden het nog kunnen zien, en een afbeelding van het zeepaard staat jaren later nog op een Delfts uithangbord. Aldus, zo concludeert Coenen 'mag men wel geloven dat er zeepaarden in de zee zijn'.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_228v.jpg"
  },
  {
    "Creature": "Zevenkoppig monster",
    "Description": "De voorbeelden van Bijbelse zeemonsters en draken waarover Coenen vertelt in het Visboeck laten iets zien van zijn diepe gelovigheid, religieus ontzag en vertrouwen in God. Hij legt uit dat hij het zevenkoppige wezen links in zijn Visboeck opneemt omdat het uit zee oprijst: 'Omdat het wel te geloven valt als zich vreemde monsters uit de zee verheffen dat er gewoonlijk altijd iets wonderlijks in is en dat er verborgen dingen in zijn, waarna God iets wonderlijks laat voorvallen, zoals in dit boek menigmaal wordt verteld.' En na een lang citaat uit het 13e hoofdstuk van de Openbaringen van Sint Jan over het zevenkoppige monster spreekt Coenen zich expliciet uit voor het protestantse geloof. Hij maakt echter ook duidelijk dat hij er niet de man naar is om christenen die hun eredienst anders wilden inrichten daarmee lastig te vallen. En dat plaatst hem bij de gematigde protestanten in dit tijdperk van godsdienstoorlogen en -vervolgingen.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_239v.jpg'"
  },
  {
    "Creature": "De zeebezem",
    "Description": "In veel gevallen is de uiterlijke gelijkenis van zeedieren met hun tegenhangers op het land zo sterk, dat hun namen vanzelfsprekend lijken. Dat geldt bijvoorbeeld voor de zeedruiven (groeisels op oesterschelpen die sterk op druiventrossen lijken), zeester, zee-egel en zeebezem (afbeelding linksonder). De beschrijving en afbeelding van de zeebezem neemt Coenen over van een (niet nader genoemde) Duitse auteur, die meldt dat dit dier doet denken aan een schilderspenseel of een bezem, en dat het voorkomt langs rotsachtige kusten. Daar zit het dier vastgegroeid aan de rots en beweegt het mee met het water. Coenen schrijft in de marge: in Holland is er een zanderige kust en zijn er geen rotsen, en dus zijn er ook geen zeebezems.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_276v.jpg"
  },
  {
    "Creature": "Het Krakovische monster",
    "Description": "Het vreemd uitziende monster op de linkerbladzijde was geboren in februari 1547 te Krakow in Polen. Coenen ontdekt het monster in een publicatie die van de zestiende tot diep in de achttiende eeuw in heel Europa beroemd zou blijven: Sebastian Münsters Cosmographia (1544). Dit monster heeft vreemde oren, een aantal hoofden die uit zijn lijf groeien, een duivelse staart, een rare slurfachtige neus, vreemde voeten en ook nog vlammende ogen. In feite is het geen zeemonster maar een misgeboorte. Zowel monsters als misgeboorten worden in Coenens tijd door veel Europeanen aangezien voor waarschuwingen of voortekenen van God. En daaronder zijn ook veel geleerden.",
    "Link": "https://upload.wikimedia.org/wikipedia/commons/6/65/Adriaen_Coenen%27s_Visboeck_-_KB_78_E_54_-_folio_326v.jpg"
  }
]
	let index = 0
	
	let lastpage; 
	const next = () => {
		chatMessages = chatMessages.filter(i => i !== lastpage);
		
		index = (index + 1) % carouselPhotos.length
		lastpage = { role: 'system', content: '<h2 class="text-2xl font-extrabold dark:text-black">'+ carouselPhotos[index].Creature+'</h2> ' + carouselPhotos[index].Description}
		chatMessages = [...chatMessages, lastpage]

		scrollToBottom()
		setTimeout(updatePost, 2000)
	}
	const prev = () => {
		
		chatMessages = chatMessages.filter(i => i !== lastpage);
		index = (index - 1 + carouselPhotos.length) % carouselPhotos.length;
				lastpage = { role: 'system', content: '<h2 class="text-2xl font-extrabold dark:text-black">'+ carouselPhotos[index].Creature+'</h2> ' + carouselPhotos[index].Description}

		chatMessages = [...chatMessages, lastpage]
		scrollToBottom()
		setTimeout(updatePost, 2000)
	}

	let query: string = ''
	let answer: string = ''
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let scrollToDiv: HTMLDivElement

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
		}, 100)
	}

	const handleSubmit = async () => {
		if (query.length<3){
			alert("That seems too short to be a question.")
			return;
		}

		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]
		updatePost();
		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		})

		query = ''

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', (e) => {
			scrollToBottom()
			try {
				loading = false
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }]

					answer = ''



					return
				}

				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices

				if (delta.content) {
					answer = (answer ?? '') + delta.content
				}
			} catch (err) {
				handleError(err)
			}
		})
		eventSource.stream()
		scrollToBottom()
		setTimeout(updatePost, 2000)
		
	}

	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}

    export let data;
    let { countries } = data;
    $: ({ countries } = data);

	export const updatePost = async () => {
      
const { data, error } = await supabase
  .from('posts')
  .upsert([
    {id:randomString, messages: chatMessages },
  ])
console.log(chatMessages)
		console.log(error)
        return { data, error };
    };
	

	
</script>
 

<div class = "flex flex-wrap justify-center w-full gap-2 m-4">
	<a class="block p-6  w-half rounded-lg bg-slate-800">

	<div class = "flex-col">
		
	<h2 class="text-2xl font-extrabold "><a href="https://www.kb.nl/ontdekken-bewonderen/topstukken/visboeck" target="_blank" ><span  class="underline underline-offset-3 decoration-4 decoration-blue-400 dark:decoration-blue-600">Visboeck</span> </a>van Adriaen Coenen</h2>
		<p class="mb-4 text-sm font-normal text-white">
			Geniet van het Visboeck, met ChatGPT.		

		<div class="max-w-lg  rounded overflow-hidden shadow-lg gap-4">

			{#each [carouselPhotos[index]] as item (index)}
			<img class="w-full" src={item.Link} alt={item.Creature}>
			{/each}
			
			
		  </div>
		

	</div>
</a>
<title>Hi, I'm CuratorBot</title>


<br>
	<div class="flex flex-col gap-4 max-w-2xl w-fit items-center ">

		<div class="rounded-md w-full gap-4 bg-slate-800 px-4 flex rounded-md px-6 justify-between p-4 gap-4">
			<h4 class="mb-2 text-2xl font-extrabold leading-none tracking-tight text-white md:text-2xl lg:text-2xl ">
				{index+1}/{carouselPhotos.length}</h4>

			<div class="inline-flex">
				<button on:click={prev} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
				  Prev
				</button>
				<button on:click={next} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
				  Next
				</button>
			</div>
		</div>

		<div class="h-[700px] bg-white rounded-md p-2 overflow-y-auto flex flex-col ">
			<div class="flex flex-col ">
				<ChatMessage uuid = {randomString} ind =0 type="assistant" message="Hallo, ik ben een curator chatbot die informatie over het Visboeck geeft. De pagina waarover je het had gaat over het wezen de zeebisschop. Volgens Coenen is dit monster een bewijs van de wonderlijke werken van God en voegde hij ook een eigen gedichtje toe. Wil je meer weten?" />
				<ChatMessage uuid = {randomString}  ind =0 type="user" message="Wat kan ik je vragen?" />
				<ChatMessage uuid = {randomString} ind =0 type="assistant" message="Vraag als: 1. Wat is het Visboeck? 2. Wie was Adriaen Coenen? 3. Waarom wordt het Visboeck gezien als een topstuk? 4. Wat is de Grote Kroniek van Holland? 5. Wat betekent Coenens gedicht over de zeebisschop?" />
				
				{#each chatMessages as message, i }
					<ChatMessage uuid = {randomString} ind ={i} type={message.role} message={message.content} />
				{/each}
				{#if answer}
					<ChatMessage uuid = {randomString} ind =0 type="assistant" message={answer} />
				{/if}
				{#if loading}
					<ChatMessage uuid = {randomString} ind =0 type="assistant" message="Loading..." />
				{/if}
			</div>
			<div class="" bind:this={scrollToDiv} />
	
		</div>
		

		<form	class="flex w-full rounded-md gap-4 bg-slate-800 p-4"
			on:submit|preventDefault={() => handleSubmit()} >
			<input type="text" class="input input-bordered w-full text-black bg-white" bind:value={query} />
			<button type="submit" on:click ={updatePost} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"> Send </button>
		</form>

	</div>


	

</div>
