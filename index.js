const openai = require('./openai');
const googleApi = require('./googleImg')
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');

const readline = require('readline');

function valutaPertinenza(results) {
    if (!results || results.length === 0) {
        return null;
      }
  
      return results[0];
  }
  


    
    
    async function generateImage(query) {
        try {
          const results = await googleApi.searchImages(query);
          console.log("results:", results);
      
          // Valuta la pertinenza dei risultati e ottieni l'URL più pertinente
          const imageUrl = valutaPertinenza(results);
          console.log("imageUrl:", imageUrl);
      
          // Controlla se l'URL dell'immagine è valido e visita il link
          if (imageUrl) {
            // Esegui le operazioni desiderate con l'URL dell'immagine
            // Ad esempio, puoi utilizzarlo per popolare il template dell'immagine nella tua app
      
            // Restituisci l'imageUrl per usarlo altrove nella tua app
            return imageUrl;
          } else {
            console.log("Nessun risultato pertinente trovato per la query:", query);
            return null;
          }
        } catch (error) {
          console.error('Errore durante la ricerca delle immagini:', error);
          return null;
        }
      }
      

function generateSiteContent(template, directoryPath){
    if (template.charAt(0) ==='1'){    //ID relativo a sito di news
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log('Errore durante la lettura della directory:', err);
                return;
            }
            files.forEach(async (file)=>{
                const fileExtension = path.extname(file);
                const fileName = path.basename(file, fileExtension);

                // Verifica l'estensione e il nome del file
                if (fileExtension === '.html') {
                    const filePath = path.resolve(directoryPath, file);
                    // Leggi il contenuto del file HTML
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    // Analizza il contenuto HTML 
                    const $ = cheerio.load(fileContent);
                    if (fileName === 'index') {
                        const mainArticle = $('#main-article')
                        const generatedMainArticleName= await openai.generateContent('A title for a main news article')
                        mainArticle.find('div').text(generatedMainArticleName)

                        const query = `${generatedMainArticleName.split(' ').slice(0, 4).join(' ')}`; // Sostituisci con il nome o il titolo generato dall'altra API
                            const imgUrl =await generateImage(query)
                            
                            if(imgUrl){
                               
                                mainArticle.css('background-image', `url(${imgUrl})`)

                            }
                        //Itero per ogni elemento di id article
                        const articleIds = ['main-news1', 'main-news2', 'main-news3', 'top-news1', 'top-news2', 'top-news3','latest-news1','latest-news2','latest-news3']; // Aggiungi gli ID dei prodotti desiderati

                        await Promise.all(articleIds.map(async (articleId) => {
                            const articleElement = $('#' + articleId );

                            const generatedArticleName = await openai.generateContent('A title for a news article');
                            articleElement.find('div').text(generatedArticleName);

                            

                            const query = `${generatedArticleName.split(' ').slice(0, 4).join(' ')}`; // Sostituisci con il nome o il titolo generato dall'altra API
                            const imgUrl =await generateImage(query)
                            
                            if(imgUrl){
                               
                                articleElement.css('background-image', `url(${imgUrl})`)

                            }
                        }));
                        
                        //Sovrascrivo il file con quello modificato
                        fs.writeFileSync(filePath, $.html());
                        

                    } 
                }


        
            })

        })
        return true

    }else if(template.charAt(0) ==='2'){ //ID relativo a sito Blog

    }else if (template.charAt(0)==='3'){ //ID relativo a sito di E-commerce
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log('Errore durante la lettura della directory:', err);
                return;
            }
            files.forEach(async (file)=>{
                const fileExtension = path.extname(file);
                const fileName = path.basename(file, fileExtension);

                // Verifica l'estensione e il nome del file
                if (fileExtension === '.html') {
                    const filePath = path.resolve(directoryPath, file);
                    // Leggi il contenuto del file HTML
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    // Analizza il contenuto HTML 
                    const $ = cheerio.load(fileContent);
                    if (fileName === 'index') {
                        
                        //Itero per ogni elemento di classe product
                        const productIds = ['prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6']; // Aggiungi gli ID dei prodotti desiderati

                        await Promise.all(productIds.map(async (productId) => {
                            const productElement = $('#' + productId);

                            const generatedProductName = await openai.generateContent('A product name');
                            productElement.find('.product-name').text(generatedProductName);

                            const generatedProductDescription = await openai.generateContent(`a description for "${generatedProductName}": `);
                            productElement.find('.product-description').text(generatedProductDescription);

                            /*
                            const generatedProductPrice = await openai.generateContent(`a price (€) for "${generatedProductName}": `);
                            console.log(generatedProductPrice)
                            productElement.find('.price').text(generatedProductPrice);
                            */

                            const query = `${generatedProductName}`; // Sostituisci con il nome o il titolo generato dall'altra API
                            const imgUrl =await generateImage(query)
                            
                            if(imgUrl){
                                const imgElement = productElement.find($('#prod-img'))
                                imgElement.css('background-image', `url(${imgUrl})`)

                            }
                        }));
                        





                        //Sovrascrivo il file con quello modificato
                        fs.writeFileSync(filePath, $.html());
                        

                    } else if (fileName === 'contact') {
                        
                        const aboutElement = $('.about-content');
                        
                        const generatedAboutContent = await openai.generateContent('about section of a shop online');
                        aboutElement.text(generatedAboutContent);

                        const emailElement = $('.contact-email');
                        
                        const generatedEmailContent = await openai.generateContent('a random email address: E-mail: <email>');
                        emailElement.text(generatedEmailContent);

                        const phoneElement = $('.contact-phone');
                        
                        const generatedPhoneContent = await openai.generateContent('a random phone number: Phone: <phone>');
                        phoneElement.text(generatedPhoneContent);

                        const addressElement = $('.contact-address');
                        
                        const generatedAddressContent = await openai.generateContent('a random address: Address: <street>, <city>, <country>');
                        addressElement.text(generatedAddressContent);

                        //Sovrascrivo il file con quello modificato
                        fs.writeFileSync(filePath, $.html());
                    }
                    // Aggiungi ulteriori controlli per altri file con nomi specifici
                }


        
            })

        })
        return true

    }else if (template.charAt(0)==='4'){ //ID relativo a sito portfolio

    }else{
        return false
    }  
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

console.log("Inserisci il numero relativo al template che vuoi testare")

rl.question("'1'= News, '2'=Blog, '3'=Ecommerce, '4'=Portfolio: ", (templateId) => {
    //Creazione cartella con sito
    const siteDirectory = path.resolve(__dirname, 'site');
    fs.mkdirSync(siteDirectory,{ recursive: true })
    console.log('Cartella creata:', siteDirectory);

    const templateDirectory = path.resolve(__dirname, templateId +'0'); // Directory path for the template folder
    fsExtra.copySync(templateDirectory, siteDirectory);
    console.log('File copiati da:', templateDirectory);

    const generationSuccess = generateSiteContent(templateId, siteDirectory);
    rl.close();
});

   //Modifica il primo parametro in base a quale tipologia vuoi testare
//'1'= News, '2'=Blog, '3'=Ecommerce, '4'=Portfolio
