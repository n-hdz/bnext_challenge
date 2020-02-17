/*
async function getProduct() {
    let response = await intermundialGetProduct().catch(err => { err });
    return response;
}

async function getAvailability(insurance, request) {
    let response = await intermundialGetAvailability(insurance, request).catch(err => { err });
    return response;
}

async function bookInsurance(data) {
    let response = await intermundialBook(data).catch(err => { err });
    return response;
}
*/

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
        const xml = fs.readFileSync('soap_test/test.xml', 'utf-8');

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

module.exports = {
    getProduct: async () => {
        let response = await intermundialGetProduct().catch(err => { err });
        return response;
    },

    getAvailability: async (insurance, request) => {
        let response = await intermundialGetAvailability(insurance, request).catch(err => { err });
        return response;
    },

    bookInsurance: async (data) => {
        let response = await intermundialBook(data).catch(err => { err });
        return response;
    }
}
