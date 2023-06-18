# CuratorBot - Specifications and Details

## Introduction
The Visboeck CuratorBot (CB) is a prototype conversational agent system developed by H. Gu and J.S. Love at TU Delft under the aegis of the Future Libraries Lab (https://delftdesignlabs.org/future-libraries-lab/). It is an experimental research tool in the form of a system intended to be used to interrogate the ways in which people could interact with rapidly developing natural language technology within cultural heritage settings. The CB has been conceived of as a supplement to docents (tour guides) or curators for people exploring library and museum collections. It is further meant to give some grounding to the extensive debates surrounding applied machine learning technologies, their opportunities and their limitations. 

## Design Choices
In considering how people could interact with the CB, its creators canvassed the existing landscape of conversational agents, or chatbots, in cultural heritage environments. Notable examples include the messenger bot at the Anne Frank museum and MAMBA’s ‘Dialogue with Artworks’. An early version of the CB was deployed as a kiosk-style interface to more rapidly get a viable prototype for people to use.


[Early kiosk-style prototype of CuratorBot]

This embodiment of the CB was first demonstrated to a larger audience in September 2022 at an event held at TU Delft for academics, students and heritage professionals interested in future technologies for museums and libraries. 

Outside of the relatively controlled environment of TU Delft, we have been conducting subsequent tests of the CB through a web-based service. Museum and library visitors can access it through any internet-capable device. This decision was based largely on the notion that people experience a higher degree of control and autonomy when they have mobile learning technology. Furthermore the CB functions as a website rather than a downloadable application common to many heritage locations in order to be more immediately accessible and not burden visitors with installing software on their mobile devices. The current setup has a further advantage of being available outside of the museum or library with the future possibility of visitors possessing their own, individual instances customizable to their own interests and preferences.

[Screenshot of current instance of the CuratorBot]

At present one of the more significant limitations on scaling up this setup is cost. Since the system relies on third-party services (see below), each interaction carries a small monetary fee. Some suggestions on how this might be resolved in the near future are given below [something down there about Bloom/local model training], but for the moment the CB access point (URL) remains unpublished to prevent the risk of exploitation.

## Software
CuratorBot is built on top of OpenAI’s ChatGPT API (https://platform.openai.com/docs/models/chatgpt). The user interface is built in Svelte, and the assets for it are available in the project’s Github repository: https://github.com/gukuma/chatgpt-visboeck 

Information Sources
The CB contains supplemental information (fine-tuning) on top of the general model provided by OpenAI. There are eighteen scanned images selected for display from the larger volume of Het Visboeck, which has been digitized by the National Library of the Netherlands and is available in their Delpher system: https://geheugen.delpher.nl/nl/geheugen/view/visboeck?coll=ngvn&maxperpage=36&page=1&query=visboeck&identifier=TOPSTUK%3A0071. 

General information about the work has been drawn from the Wikipedia entry on the Visboeck: https://nl.wikipedia.org/wiki/Visboeck. Moreover each page has been supplemented with information from the Rondleiding (tour guide) curated by the National Library and available through a website dedicated to the Visboeck: https://galerij.kb.nl/kb.html#/nl/visboek/page/15/zoom/3/lat/-55.12864906848878/lng/52.55859375.  

An extensive amount of further documentation, including transcripts, academic literature and exhibition catalogues, could be used to extend the information base within the CB. At present these have been ignored due to costs associated with fine-tuning the system. 

## Demonstrations
CuratorBot is intended to be temporary partly due to cost and partly due to the uncertain nature of its long-term utility. We deploy it for fixed periods to observe and experiment with peoples’ interactions with it and various aspects of its design.

CB was first demonstrated to a larger public in September 2022 as part of a showcase of emerging technologies in the field of arts and culture. Alongside the CB were displays of generative art as well as virtual and augmented reality. Interaction with the CB was left fairly open to the audience, who were able to submit questions through a laptop about Edward Hopper’s 1942 painting Nighthawks.

An experimental demonstration of the Visboeck is available in the foyer of the National Library through a kiosk and a QR code for personal devices from May until July 2023.


## Setup

1. Clone the repository from GitHub: `git clone [repository_url]`.
2. Create an `.env` file at the root of the project.
3. Open the `.env` file and add the following environment variables:

```
OPENAI_KEY=
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

4. Save the `.env` file.

## Developing

1. Ensure you have Node.js installed on your machine.
2. Install project dependencies by running the following command in the project directory:

```
npm install
```

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
