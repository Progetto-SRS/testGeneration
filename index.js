const openai = require('./openai');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');

const readline = require('readline');

function generateSiteContent(template, directoryPath){
    if (template.charAt(0) ==='1'){    //ID relativo a sito di news

    }else if(template.charAt(0) ==='2'){ //ID relativo a sito Blog
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

                        const aboutElement = $('#about-section');
                        const mainElement = $('#main-section');
                        const objectiveElement = $('#obj-section');

                        const generatedAboutName = await openai.generateContent('About section of a blog website');
                            aboutElement.text(generatedAboutName);

                            const generatedMainName = await openai.generateContent('Main section of a blog website');
                            mainElement.text(generatedMainName);

                            const generatedObjectiveName = await openai.generateContent('Objective section of a blog website');
                            objectiveElement.text(generatedObjectiveName);

                         // await Promise.all(sectionsId.map(async (sectionsId) => {
                          //  const sectionsElement = $('#' + sectionsId);

                          //  const generatedSectionsName = await openai.generateContent('A product name');
                          //  productElement.find('.product-name').text(generatedSectionsName);

                          //  const generatedProductDescription = await openai.generateContent(`a description for "${generatedProductName}": `);
                           // productElement.find('.product-description').text(generatedProductDescription);

                            /*
                            const generatedProductPrice = await openai.generateContent(`a price (€) for "${generatedProductName}": `);
                            console.log(generatedProductPrice)
                            productElement.find('.price').text(generatedProductPrice);
                            */
                        // }));
                        

                        //Sovrascrivo il file con quello modificato
                        fs.writeFileSync(filePath, $.html());
                        

                    } else if (fileName === 'contacts') {

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

                    else if (fileName === 'blog') {
                        
                        const titleElement = $('.title');
                        const pdateElement = $('.pdate');
                        const contentElement = $('.content');

                        const generatedTitleName = await openai.generateContent('A title for a blog article');
                           titleElement.text(generatedTitleName);

                            const generatedPdateName = await openai.generateContent('Publication date of an article dd/mm/yyyy and a name of an author');
                           pdateElement.text(generatedPdateName);

                            const generatedContentName = await openai.generateContent(`A blog article matching the title ${generatedTitleName}`);
                            contentElement.text(generatedContentName);

                            fs.writeFileSync(filePath, $.html());
                    }

                    else if (fileName === 'articles') {
                        
                        const articleIds = ['article1', 'article2', 'article3'];
                        
                        await Promise.all(articleIds.map(async (articleId) => {
                            const articleElement = $('#' + articleId);

                            const generatedArticleName = await openai.generateContent('An article title');
                            articleElement.find('.title').text(generatedArticleName);

                            const generatedArticleDescription = await openai.generateContent(`a description for "${generatedArticleName}": `);
                            articleElement.find('.content').text(generatedArticleDescription);

                        }));
                        //Sovrascrivo il file con quello modificato
                        fs.writeFileSync(filePath, $.html());
                    }
                    // Aggiungi ulteriori controlli per altri file con nomi specifici
                }


        
            })

        })
        return true

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

                        const titleElement = $('.title');
                        const contentElement = $('.content');
                        const nameElement = $('.name');
                        const ptechnoElement = $('.ptechno');
                        const descriptionElement = $('.description');

                            const generatedTitleName = await openai.generateContent('A title for an image of a portfolio project');
                            titleElement.text(generatedTitleName);

                            const generatedContentName = await openai.generateContent();
                            contentElement.text(generatedContentName);

                            const generatedNameName = await openai.generateContent('A name of a person as following Name Surname');
                            nameElement.text(generatedNameName);

                            const generatedPtechnoName = await openai.generateContent('the technologies used for the realization of the project');
                            ptechnoElement.text(generatedPtechnoName);

                            const generatedDescriptionName = await openai.generateContent('a short description of the images');
                            descriptionElement.text(generatedDescriptionName);



                         // await Promise.all(sectionsId.map(async (sectionsId) => {
                          //  const sectionsElement = $('#' + sectionsId);

                          //  const generatedSectionsName = await openai.generateContent('A product name');
                          //  productElement.find('.product-name').text(generatedSectionsName);

                          //  const generatedProductDescription = await openai.generateContent(`a description for "${generatedProductName}": `);
                           // productElement.find('.product-description').text(generatedProductDescription);

                            /*
                            const generatedProductPrice = await openai.generateContent(`a price (€) for "${generatedProductName}": `);
                            console.log(generatedProductPrice)
                            productElement.find('.price').text(generatedProductPrice);
                            */
                        // }));
                        

                        //Sovrascrivo il file con quello modificato
                        fs.writeFileSync(filePath, $.html());
                        

                    } else if (fileName === 'pcontacts') {

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

                    else if (fileName === 'me') {
                        
                        const selfdescElement = $('.selfdesc');

                        const generatedSelfdescName = await openai.generateContent('A description about a portfolio owner, his skills at work, his passion and his work experiences');
                        selfdescElement.text(generatedSelfdescName);

                            fs.writeFileSync(filePath, $.html());
                    }

                    else if (fileName === 'works') {
                        
                        const articleIds = ['article1', 'article2', 'article3'];
                        
                        await Promise.all(articleIds.map(async (articleId) => {
                            const articleElement = $('#' + articleId);

                            const generatedArticleName = await openai.generateContent('An article title');
                            articleElement.find('.title').text(generatedArticleName);

                            const generatedArticleDescription = await openai.generateContent(`a description for "${generatedArticleName}": `);
                            articleElement.find('.content').text(generatedArticleDescription);

                        }));
                        //Sovrascrivo il file con quello modificato
                        fs.writeFileSync(filePath, $.html());
                    }
                    // Aggiungi ulteriori controlli per altri file con nomi specifici
                }


        
            })

        })
        return true

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
