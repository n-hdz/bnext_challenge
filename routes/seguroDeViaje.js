var express = require('express');
var router = express.Router();
// UI days covered
function getDays(departure, arrival) {
    var date1 = new Date(departure);
    var date2 = new Date(arrival);

    var diffTime = date2.getTime() - date1.getTime();
    var days = diffTime / (1000 * 3600 * 24);

    return days + 1;
}

// GET Insurance Menu
router.get('/', function (req, res, next) {
    res.render('seguroDeViaje', {
        title: 'Bnext - Front End Challenge',
        valid: req.query.valid == 'false' ? false : true,
        err: req.query.err
    });
});

router.get('/nuevo', function (req, res, next) {
    getProduct().then(result => {
        if (result.statusCode == 200) {
            // Async string result parser
            res.render('nuevoSeguroDeViaje', {
                title: 'Bnext - Front End Challenge',
                err: false,
                insurance: {
                    code: /(?<=<product>.*<code>)(.*?)(?=<\/code>.*<\/product>)/gm.exec(result.body)[0],
                    shortName: /(?<=<product>.*<shortName>)(.*?)(?=<\/shortName>.*<\/product>)/gm.exec(result.body)[0],
                    longName: /(?<=<product>.*<longName>)(.*?)(?=<\/longName>.*<\/product>)/gm.exec(result.body)[0],
                    locale: /(?<=<product>.*<locale>)(.*?)(?=<\/locale>.*<\/product>)/gm.exec(result.body)[0],
                    type: /(?<=<product>.*<type>)(.*?)(?=<\/type>.*<\/product>)/gm.exec(result.body)[0]
                }
            });
        } else  {
            res.redirect('/seguro_de_viaje?valid=false&err=connect');
        }
    }).catch(err => {
        res.redirect('/seguro_de_viaje?valid=false&err=connect');
        return err;
    });
});

router.get('/solicitud', function (req, res, next) {
    getProduct().then(result => {
        if (result.statusCode == 200) {
            // Async string result parser
            res.render('solicitarSeguroDeViaje', {
                title: 'Bnext - Front End Challenge',
                valid: req.query.valid == 'false' ? false : true,
                err: req.query.err,
                insurance: {
                    code: /(?<=<product>.*<code>)(.*?)(?=<\/code>.*<\/product>)/gm.exec(result.body)[0],
                    shortName: /(?<=<product>.*<shortName>)(.*?)(?=<\/shortName>.*<\/product>)/gm.exec(result.body)[0],
                    longName: /(?<=<product>.*<longName>)(.*?)(?=<\/longName>.*<\/product>)/gm.exec(result.body)[0],
                    locale: /(?<=<product>.*<locale>)(.*?)(?=<\/locale>.*<\/product>)/gm.exec(result.body)[0],
                    type: /(?<=<product>.*<type>)(.*?)(?=<\/type>.*<\/product>)/gm.exec(result.body)[0]
                }
            });
        } else {
            res.redirect('/seguro_de_viaje?valid=false&err=connect');
        }
    }).catch(err => {
        res.redirect('/seguro_de_viaje?valid=false&err=connect');
        return err;
    });
});

router.post('/confirmar', function (req, res, next) {
    getProduct().then(result => {
        if (result.statusCode == 200) {
            let insurance = {
                code: /(?<=<product>.*<code>)(.*?)(?=<\/code>.*<\/product>)/gm.exec(result.body)[0],
                shortName: /(?<=<product>.*<shortName>)(.*?)(?=<\/shortName>.*<\/product>)/gm.exec(result.body)[0],
                longName: /(?<=<product>.*<longName>)(.*?)(?=<\/longName>.*<\/product>)/gm.exec(result.body)[0],
                locale: /(?<=<product>.*<locale>)(.*?)(?=<\/locale>.*<\/product>)/gm.exec(result.body)[0],
                type: /(?<=<product>.*<type>)(.*?)(?=<\/type>.*<\/product>)/gm.exec(result.body)[0]
            }
            let request = {
                locale: req.body.locale,
                departureDate: req.body.departureDate,
                arrivalDate: req.body.arrivalDate,
                insuredUser: req.body.insuredUser
            }

            getAvailability(insurance, request).then(result => {
                if (result.statusCode == 200) {
                    let err = /(?<=\.travelio\.xpt\.es\/\"\/>)(.*?)(?=<\/soap:Body>)/gm.exec(result.body);
                    if (err == null) {
                        let user = request.insuredUser.split(' ');
                        // Async string result parser
                        res.render('confirmarSeguroDeViaje', {
                            title: 'Bnext - Front End Challenge',
                            valid: req.query.valid == 'false' ? false : true,
                            err: req.query.err,
                            insurance: {
                                code: /(?<=<product>.*<code>)(.*?)(?=<\/code>.*<\/product>)/gm.exec(result.body)[0],
                                shortName: /(?<=<product>.*<shortName>)(.*?)(?=<\/shortName>.*<\/product>)/gm.exec(result.body)[0],
                                longName: /(?<=<product>.*<longName>)(.*?)(?=<\/longName>.*<\/product>)/gm.exec(result.body)[0],
                                type: /(?<=<product>.*<type>)(.*?)(?=<\/type>.*<\/product>)/gm.exec(result.body)[0],
                                bookingState: /(?<=<varietyDistributions>.*<bookingStatus>)(.*?)(?=<\/bookingStatus>.*<\/varietyDistributions>)/gm.exec(result.body)[0],
                                currencyCode: /(?<=<varietyDistributions>.*<currencyCode>)(.*?)(?=<\/currencyCode>.*<\/varietyDistributions>)/gm.exec(result.body)[0],
                                modality: /(?<=<varietyDistributions>.*<modality><code>)(.*?)(?=<\/code>.*<\/modality>.*<\/varietyDistributions>)/gm.exec(result.body)[0],
                                countryName: /(?<=<varietyDistributions>.*<modality>.*<longName>)(.*?)(?=<\/longName>.*<\/modality>.*<\/varietyDistributions>)/gm.exec(result.body)[0],
                                price: /(?<=<varietyDistributions>.*<price>)(.*?)(?=<\/price>.*<\/varietyDistributions>)/gm.exec(result.body)[0],
                                sellContract: /(?<=<varietyDistributions>.*<sellContract><code>)(.*?)(?=<\/code><\/sellContract>.*<\/varietyDistributions>)/gm.exec(result.body)[0],
                                sellPriceSheet: /(?<=<varietyDistributions>.*<sellPriceSheet><code>)(.*?)(?=<\/code><\/sellPriceSheet>.*<\/varietyDistributions>)/gm.exec(result.body)[0],
                                sellTariff: /(?<=<varietyDistributions>.*<sellTariff><code>)(.*?)(?=<\/code><\/sellTariff>.*<\/varietyDistributions>)/gm.exec(result.body)[0],
                                productVariety: /(?<=<productVariety>.*<code>)(.*?)(?=<\/code>.*<\/productVariety>)/gm.exec(result.body)[0],
                                locale: /(?<=<productVariety>.*<locale>)(.*?)(?=<\/locale>.*<\/productVariety>)/gm.exec(result.body)[0],
                                adultNumber: /(?<=<productVariety>.*<adults>)(.*?)(?=<\/adults>.*<\/productVariety>)/gm.exec(result.body)[0],
                                passenger_name: user[0].toUpperCase(),
                                passenger_surname: user[1].toUpperCase(),
                                departureDate: request.departureDate,
                                arrivalDate: request.arrivalDate,
                                daysCovered: getDays(request.departureDate, request.arrivalDate)
                            }
                        });
                    } else {
                        res.redirect('/seguro_de_viaje/solicitud?valid=false&err=date');
                    }
                } else {
                    res.redirect('/seguro_de_viaje?valid=false&err=connect');
                }
            }).catch(err => {
                res.redirect('/seguro_de_viaje/solicitud?valid=false&err=region');
            });
        } else {
            res.redirect('/seguro_de_viaje?valid=false&err=connect');
        }
    }).catch(err => {
        res.redirect('/seguro_de_viaje?valid=false&err=connect');
        return err;
    });
});

router.post('/checkout', function (req, res, next) {
    bookInsurance(JSON.parse(req.body.insurance)).then(result => {
        if (result.statusCode == 200) {
            return (JSON.parse(result.body));
        } else {
            let fault = /(?<=<faultstring>)(.*?)(?=<\/faultstring>)/gm.exec(result)[0].split('.');
            res.redirect('/seguro_de_viaje/solicitud?valid=false&err=' + fault[0]);
        }
    });
});

module.exports = router;

async function getProduct() {
    let response = await intermundialGetProduct().catch(err => { err });
    return response;
}

function intermundialGetProduct() {
    return new Promise((resolve, reject) => {
        const soapRequest = require('easy-soap-request');
        const fs = require('fs');
        const url = 'https://ws.intermundial.es/travelio-soaTIO/CommonsWSSessionBean?wsdl/'
        const sentHeaders = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'GET'
        }
        // Hardcoded getProduct Envelope
        const xml = fs.readFileSync('soap/product.xml', 'utf-8');

        (async () => {
            const { response } = await soapRequest({
                url: url,
                headers: sentHeaders,
                xml: xml,
                timeout: 3000
            });
            const { headers, body, statusCode } = response;
            resolve(response);
        })()
        .catch(err => {
            reject(err);
        });
    });
}

async function getAvailability(insurance, request) {
    let response = await intermundialGetAvailability(insurance, request).catch(err => { err });
    return response;
}

function intermundialGetAvailability(insurance, request) {
    return new Promise((resolve, reject) => {
        const soapRequest = require('easy-soap-request');
        const url = 'https://ws.intermundial.es/travelio-soaTIO/CommonsWSSessionBean?wsdl/'
        const sentHeaders = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'GET'
        }

        // API Request + Insurance Product => XML getAvailability
        const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://commonsws.soa.travelio.xpt.es/">' +
            '<soapenv:Header/><soapenv:Body><com:getAvailabilityV2><authenticationData><password>pruebas_mex</password><user>pruebas_mex</user><locale>' +
            request.locale + '</locale><domain>intermundial-soaMexico</domain></authenticationData>' +
            '<availabilitySearchParams><adultNumber>1</adultNumber><arrivalDate>' + request.departureDate + '</arrivalDate><childNumber>0</childNumber>' +
            '<confirmedAvailability>true</confirmedAvailability>' +
            '<departureDate>' + request.arrivalDate + '</departureDate>' +
            '<productId>' + insurance.code + '</productId><type>' + insurance.type + '</type>' +
            '<varietyNumber>1</varietyNumber></availabilitySearchParams><excludedInfo>PRODUCT_DESCRIPTION</excludedInfo></com:getAvailabilityV2>' +
            '</soapenv:Body></soapenv:Envelope>';

        (async () => {
            const { response } = await soapRequest({
                url: url,
                headers: sentHeaders,
                xml: xml,
                timeout: 3000
            });
            const { headers, body, statusCode } = response;
            resolve(response);
        })()
        .catch(err => {
            reject(err);
        });
    });
}

async function bookInsurance(data) {
    let response = await intermundialBook(data).catch(err => { err });
    return response;
}

function intermundialBook(data) {
    return new Promise((resolve, reject) => {
        const soapRequest = require('easy-soap-request');
        const url = 'https://ws.intermundial.es/travelio-soaTIO/CommonsWSSessionBean?wsdl/'
        const fs = require('fs');
        const sentHeaders = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'GET'
        }
        
        // API getProduct + getAvailabilityParams + getAvailability => XML book
        
        const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://commonsws.soa.travelio.xpt.es/">' +
            '<soapenv:Body><com:bookV2>' +
            '<authenticationData><password>pruebas_mex</password><user>pruebas_mex</user><locale>' + data.locale + '</locale><domain>intermundial-soaMexico</domain></authenticationData>' +
            '<bookingParams><bookingLines>' +
            '<futureBookingState>' + data.bookingState + '</futureBookingState><departureDate>' + data.departureDate + '</departureDate><arrivalDate>' + data.arrivalDate + '</arrivalDate><product>' + data.code + '</product>' +
            '<sellContract>' + data.sellContract + '</sellContract><sellTariff>' + data.sellTariff + '</sellTariff><sellPriceSheet>0880edd1-20ce-44ca</sellPriceSheet><sellCurrency>' + data.currencyCode + '</sellCurrency>' +
            '<productVariety>' + data.productVariety + '</productVariety><modality>' + data.modality + '</modality><adultNumber>1</adultNumber>' +
            '<passengers><name>' + data.passenger_name + '</name><surname>' + data.passenger_surname + '</surname><age>30</age></passengers></bookingLines>' +
            '<holder><type>NATURAL</type><pid>336412492X</pid><name>' + data.passenger_name + '</name><surname>' + data.passenger_surname + '</surname><locale>' + data.locale + '</locale></holder>' +
            '<onTheFly>false</onTheFly><thirdReference>34661RT</thirdReference></bookingParams></com:bookV2></soapenv:Body></soapenv:Envelope>';

        (async () => {
            const { response } = await soapRequest({
                url: url,
                headers: sentHeaders,
                xml: xml,
                timeout: 3000
            });
            const { headers, body, statusCode } = response;
            resolve(response);
        })()
            .catch(err => {
                const { headers, body, statusCode } = err;
                resolve(err);
            })
    });
}