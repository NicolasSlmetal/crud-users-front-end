import { HttpErrorResponse } from "@angular/common/http";
import { Message } from "../interfaces/message";

const errorMap : Record<string, string> = {
    "name_is_required": "Nome é obrigatório",
    "email_is_required": "E-mail é obrigatório",
    "email_is_not_valid": "O E-mail digitado é inválido",
    "phone_is_required": "Telefone é obrigatório", 
    "phone_must_have_size_between_10_and_12": "Telefone deve ter entre 10 a 12 dígitos",
    "phone_must_contain_only_digits": "Telefone deve conter apenas dígitos",
    "user_not_found": "Usuário não encontrado",
    "address_not_found": "Endereço não encontrado",
    "cep_must_be_provided": "CEP é obrigatório",
    "cep_must_have_length_equals_to_8": "CEP deve ter 8 digítos",
    "street_must_be_provided": "Rua é obrigatória",
    "state_must_be_provided": "Estado é obrigatório",
    "city_must_be_provided":"Cidade é obrigatória",
    "number_must_be_provided": "Número do endereço é obrigatório",
    "neighborhood_must_be_provided": "Bairro é obrigatório"

}

const errorPatternMap: Record<string, string> = {
    "^the_cep_'\\d{8}'_is_invalid$": "O CEP digitado é inválido"
} 

export function parseErrorMessages(error: HttpErrorResponse, defaultMessage = "Erro desconhecido") : Message {
    let text = ""
    let type : "WARNING" | "ERROR" = "WARNING";
    
    const parsedError : {messages: string[] | undefined, message: string | undefined} = error.error;
    
    const {messages, message} = parsedError;
    
    if (messages !== undefined) {
        text += handleMultipleMessages(messages);
    }

    if (message !== undefined) {
        text += handleSingleMessage(message);
    }

    if (text.length === 0) {
        text = defaultMessage;
        type = "ERROR";
    }

    return {
        text,
        type,
        timestamp: new Date()
    };
}

function handleSingleMessage(message: string) : string {
    let text = "";
    text = appendFromErrorMap(message, text);
    return appendFromErrorMatchMap([message], text);
}

function handleMultipleMessages(messages: string[]) : string {
    let text = "";
    for (const message of messages) {
        
        text = appendFromErrorMap(message, text);
    
    }

    text = appendFromErrorMatchMap(messages, text);

    return text;
}

function appendFromErrorMatchMap(messages: string[], text: string) {
    for (const [key, value] of Object.entries(errorPatternMap)) {
        const [errorMatch] = messages.filter(message => new RegExp(key).test(message.toLowerCase().replaceAll(" ", "_")));
        
        if (errorMatch !== undefined) {
            text += `${value}<br>`;
        }
    }
    return text;
}

function appendFromErrorMap(message: string, text: string) {
    const sanitizedMessage = message.replaceAll(" ", "_").toLowerCase();

    const messageFromMap = errorMap[sanitizedMessage];

    if (messageFromMap !== undefined) {
        text += `${messageFromMap}<br>`;
    }
    return text;
}
