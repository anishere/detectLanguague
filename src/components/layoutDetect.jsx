/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSwap } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { MdInsertPhoto } from "react-icons/md";
import { HiOutlineMicrophone } from "react-icons/hi2";

import { createWorker } from 'tesseract.js';

import { APIKeys } from "./APIKey";

function layoutDetect() {
    const [textInput, setTextInput] = useState();
    const [languageResults, setLanguageResults] = useState([]);
    const [translated, setTranslated] = useState();
    //const [paragraph, setParagraph] = useState()
    const [targetLanguage, setTargetLanguage] = useState('vi');
    const [languagePercentages, setLanguagePercentages] = useState([]);
    const [isLoadingDetect, setIsLoadingDetect] = useState(false);
    const [isLoadingTrans, setIsLoadingTrans] = useState(false);

    const [speechRecognitionLang, setSpeechRecognitionLang] = useState('en-US'); // Default language

    const handleDetect = async () => {
        setIsLoadingDetect(true);
        const textArray = textInput.split(/[.,:;]/).filter(Boolean);
    
        const newLanguageResults = [];
        
        for (const text of textArray) {
            const options = {
                method: 'POST',
                url: 'https://google-translate-v21.p.rapidapi.com/detect',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': APIKeys,
                    'X-RapidAPI-Host': 'google-translate-v21.p.rapidapi.com'
                },
                data: {
                    text: text
                }
            };
    
            try {
                const response = await axios.request(options);
                console.log(`Detected language for "${text}":`, response.data.detected_language);
    
                newLanguageResults.push({
                    text: text,
                    language: response.data.detected_language
                });
            } catch (error) {
                console.error('Error detecting language:', error);
            }
        }
    
        // Tính phần trăm của mỗi ngôn ngữ
        const languageCount = newLanguageResults.reduce((acc, cur) => {
            acc[cur.language] = (acc[cur.language] || 0) + cur.text.length;
            return acc;
        }, {});
    
        const totalLength = textInput.length;
    
        const languagePercentages = Object.entries(languageCount).map(([lang, count]) => ({
            language: lang,
            percentage: (count / totalLength) * 100
        }));
        
        // Lưu kết quả vào state
        setLanguageResults(newLanguageResults);
        setLanguagePercentages(languagePercentages);
        setIsLoadingDetect(false);
    }

    const handleTranslate = async () => {
        setIsLoadingTrans(true);
        const textArray = textInput.split(/[.,:;]/).filter(Boolean);
    
        const translatedTextArray = [];
        const paragraph = [];
    
        for (const text of textArray) {
            const options = {
                method: 'POST',
                url: 'https://google-translate-v21.p.rapidapi.com/translate',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': APIKeys,
                    'X-RapidAPI-Host': 'google-translate-v21.p.rapidapi.com'
                },
                data: {
                    text_to_translate: text,
                    dest: targetLanguage
                }
            };
    
            try {
                const response = await axios.request(options);
                paragraph.push(`"${text}": ${response.data.translation}`)
                console.log(`"${text}":`, response.data.translation);
    
                translatedTextArray.push(response.data.translation);
            } catch (error) {
                console.error('Error translating text:', error);
            }
        }
    
        // Cập nhật trạng thái với văn bản dịch
        //setParagraph(paragraph)
        setTranslated(translatedTextArray.join('. '));
        setIsLoadingTrans(false);
    }

    function getLanguageName(languageCode) {
        switch (languageCode) {
            case 'af':
                return 'Afrikaans';
            case 'am':
                return 'Amharic';
            case 'ar':
                return 'Arabic';
            case 'az':
                return 'Azerbaijani';
            case 'be':
                return 'Belarusian';
            case 'bg':
                return 'Bulgarian';
            case 'bn':
                return 'Bengali';
            case 'bs':
                return 'Bosnian';
            case 'ca':
                return 'Catalan';
            case 'ceb':
                return 'Cebuano';
            case 'co':
                return 'Corsican';
            case 'cs':
                return 'Czech';
            case 'cy':
                return 'Welsh';
            case 'da':
                return 'Danish';
            case 'de':
                return 'German';
            case 'el':
                return 'Greek';
            case 'en':
                return 'English';
            case 'eo':
                return 'Esperanto';
            case 'es':
                return 'Spanish';
            case 'et':
                return 'Estonian';
            case 'eu':
                return 'Basque';
            case 'fa':
                return 'Persian';
            case 'fi':
                return 'Finnish';
            case 'fr':
                return 'French';
            case 'fy':
                return 'Frisian';
            case 'ga':
                return 'Irish';
            case 'gd':
                return 'Scots Gaelic';
            case 'gl':
                return 'Galician';
            case 'gu':
                return 'Gujarati';
            case 'ha':
                return 'Hausa';
            case 'haw':
                return 'Hawaiian';
            case 'he':
                return 'Hebrew';
            case 'hi':
                return 'Hindi';
            case 'hmn':
                return 'Hmong';
            case 'hr':
                return 'Croatian';
            case 'ht':
                return 'Haitian Creole';
            case 'hu':
                return 'Hungarian';
            case 'hy':
                return 'Armenian';
            case 'id':
                return 'Indonesian';
            case 'ig':
                return 'Igbo';
            case 'is':
                return 'Icelandic';
            case 'it':
                return 'Italian';
            case 'iw':
                return 'Hebrew';
            case 'ja':
                return 'Japanese';
            case 'jw':
                return 'Javanese';
            case 'ka':
                return 'Georgian';
            case 'kk':
                return 'Kazakh';
            case 'km':
                return 'Khmer';
            case 'kn':
                return 'Kannada';
            case 'ko':
                return 'Korean';
            case 'ku':
                return 'Kurdish (Kurmanji)';
            case 'ky':
                return 'Kyrgyz';
            case 'la':
                return 'Latin';
            case 'lb':
                return 'Luxembourgish';
            case 'lo':
                return 'Lao';
            case 'lt':
                return 'Lithuanian';
            case 'lv':
                return 'Latvian';
            case 'mg':
                return 'Malagasy';
            case 'mi':
                return 'Maori';
            case 'mk':
                return 'Macedonian';
            case 'ml':
                return 'Malayalam';
            case 'mn':
                return 'Mongolian';
            case 'mr':
                return 'Marathi';
            case 'ms':
                return 'Malay';
            case 'mt':
                return 'Maltese';
            case 'my':
                return 'Myanmar (Burmese)';
            case 'ne':
                return 'Nepali';
            case 'nl':
                return 'Dutch';
            case 'no':
                return 'Norwegian';
            case 'ny':
                return 'Chichewa';
            case 'or':
                return 'Odia';
            case 'pa':
                return 'Punjabi';
            case 'pl':
                return 'Polish';
            case 'ps':
                return 'Pashto';
            case 'pt':
                return 'Portuguese';
            case 'ro':
                return 'Romanian';
            case 'ru':
                return 'Russian';
            case 'sd':
                return 'Sindhi';
            case 'si':
                return 'Sinhala';
            case 'sk':
                return 'Slovak';
            case 'sl':
                return 'Slovenian';
            case 'sm':
                return 'Samoan';
            case 'sn':
                return 'Shona';
            case 'so':
                return 'Somali';
            case 'sq':
                return 'Albanian';
            case 'sr':
                return 'Serbian';
            case 'st':
                return 'Sesotho';
            case 'su':
                return 'Sundanese';
            case 'sv':
                return 'Swedish';
            case 'sw':
                return 'Swahili';
            case 'ta':
                return 'Tamil';
            case 'te':
                return 'Telugu';
            case 'tg':
                return 'Tajik';
            case 'th':
                return 'Thai';
            case 'tl':
                return 'Filipino';
            case 'tr':
                return 'Turkish';
            case 'ug':
                return 'Uyghur';
            case 'uk':
                return 'Ukrainian';
            case 'ur':
                return 'Urdu';
            case 'uz':
                return 'Uzbek';
            case 'vi':
                return 'Vietnamese';
            case 'xh':
                return 'Xhosa';
            case 'yi':
                return 'Yiddish';
            case 'yo':
                return 'Yoruba';
            case 'zh-cn':
                return 'Chinese (Simplified)';
            case 'zh-tw':
                return 'Chinese (Traditional)';
            case 'zu':
                return 'Zulu';
            default:
                return languageCode; // Trả về mã ngôn ngữ nếu không tìm thấy tên ngôn ngữ đầy đủ
        }
    }     
    
    const handleSwap = () => setTextInput(translated)

    //Image input
    const [selectImg, setSelectImg] = useState(null);
    //const [lanSelect, setLanSelect] = useState()

    const handleChangeImg = (e) => {
        setSelectImg(e.target.files[0]);
    }

    const convertImgToText = async () => {
        const worker = await createWorker(['eng', 'chi_sim', 'rus', 'fra', 'tha', 'vie', 'jpn']);
        const ret = await worker.recognize(selectImg);
        setTextInput(ret.data.text)
        await worker.terminate();
    }

    useEffect(() => {
        convertImgToText();
    }, [selectImg])

    const readInput = async (textInput) => {
        let languageCode;
        const options = {
            method: 'POST',
            url: 'https://google-translate-v21.p.rapidapi.com/detect',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': APIKeys,
                'X-RapidAPI-Host': 'google-translate-v21.p.rapidapi.com'
            },
            data: {
                text: `${textInput}`
            }
        };
    
        try {
            const response = await axios.request(options);
            languageCode = response.data.detected_language;
            console.log("Detected language:", languageCode);
        } catch (error) {
            console.error("Error detecting language:", error);
            return; // Exit function if language detection fails
        }
    
        // Dynamically determine language code
    
        // Provide default voice if language not supported
        const speech = new SpeechSynthesisUtterance(textInput);
        let voiceName = '';
        switch (languageCode) {
            case 'de':
                speech.lang = 'de-DE';
                voiceName = 'Google Deutsch';
                break;
            case 'en':
                speech.lang = 'en-US';
                voiceName = 'Google US English';
                break;
            case 'es':
                speech.lang = 'es-ES';
                voiceName = 'Google español de Estados Unidos';
                break;
            case 'fr':
                speech.lang = 'fr-FR';
                voiceName = 'Google français';
                break;
            case 'hi':
                speech.lang = 'hi-IN';
                voiceName = 'Google हिन्दी';
                break;
            case 'id':
                speech.lang = 'id-ID';
                voiceName = 'Google Bahasa Indonesia';
                break;
            case 'it':
                speech.lang = 'it-IT';
                voiceName = 'Google italiano';
                break;
            case 'ja':
                speech.lang = 'ja-JP';
                voiceName = 'Google 日本語';
                break;
            case 'ko':
                speech.lang = 'ko-KR';
                voiceName = 'Google 한국의';
                break;
            case 'nl':
                speech.lang = 'nl-NL';
                voiceName = 'Google Nederlands';
                break;
            case 'pl':
                speech.lang = 'pl-PL';
                voiceName = 'Google polski';
                break;
            case 'pt':
                speech.lang = 'pt-BR';
                voiceName = 'Google português do Brasil';
                break;
            case 'ru':
                speech.lang = 'ru-RU';
                voiceName = 'Google русский';
                break;
            case 'zh-CN':
                speech.lang = 'zh-CN';
                voiceName = 'Google 普通话（中国大陆）';
                break;
            case 'zh-HK':
                speech.lang = 'zh-HK';
                voiceName = 'Google 粤語（香港）';
                break;
            case 'zh-TW':
                speech.lang = 'zh-TW';
                voiceName = 'Google 國語（臺灣）';
                break;
            case 'vi':
                speech.lang = 'vi-VN';
                voiceName = 'Google US English';
                break;
            default:
                speech.lang = 'en-US';
                voiceName = 'Google US English'; // Default voice
                alert(`Language "${languageCode}" not supported. Using English.`);
                break;
        }
    
        // Find the voice by name
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.name === voiceName);
        if (selectedVoice) {
            speech.voice = selectedVoice;
        } else {
            console.warn(`Voice "${voiceName}" not found. Using default voice.`);
        }
    
        // Handle errors with more specific messages
        try {
            window.speechSynthesis.speak(speech);
        } catch (error) {
            if (error.name === 'NotFoundError') {
                alert('Text-to-speech is not supported on your browser.');
            } else {
                console.error("Error reading text:", error);
                alert("Text-to-speech failed. Please check your browser settings.");
            }
        }
    }

    const languages = [
        { code: 'af-ZA', name: 'Afrikaans (South Africa)' },
        { code: 'am-ET', name: 'Amharic (Ethiopia)' },
        { code: 'hy-AM', name: 'Armenian (Armenia)' },
        { code: 'az-AZ', name: 'Azerbaijani (Azerbaijan)' },
        { code: 'id-ID', name: 'Indonesian (Indonesia)' },
        { code: 'ms-MY', name: 'Malay (Malaysia)' },
        { code: 'bn-BD', name: 'Bengali (Bangladesh)' },
        { code: 'bn-IN', name: 'Bengali (India)' },
        { code: 'ca-ES', name: 'Catalan (Spain)' },
        { code: 'cs-CZ', name: 'Czech (Czech Republic)' },
        { code: 'da-DK', name: 'Danish (Denmark)' },
        { code: 'de-DE', name: 'German (Germany)' },
        { code: 'en-AU', name: 'English (Australia)' },
        { code: 'en-CA', name: 'English (Canada)' },
        { code: 'en-GH', name: 'English (Ghana)' },
        { code: 'en-GB', name: 'English (United Kingdom)' },
        { code: 'en-IN', name: 'English (India)' },
        { code: 'en-IE', name: 'English (Ireland)' },
        { code: 'en-KE', name: 'English (Kenya)' },
        { code: 'en-NZ', name: 'English (New Zealand)' },
        { code: 'en-NG', name: 'English (Nigeria)' },
        { code: 'en-PH', name: 'English (Philippines)' },
        { code: 'en-ZA', name: 'English (South Africa)' },
        { code: 'en-TZ', name: 'English (Tanzania)' },
        { code: 'en-US', name: 'English (United States)' },
        { code: 'es-AR', name: 'Spanish (Argentina)' },
        { code: 'es-BO', name: 'Spanish (Bolivia)' },
        { code: 'es-CL', name: 'Spanish (Chile)' },
        { code: 'es-CO', name: 'Spanish (Colombia)' },
        { code: 'es-CR', name: 'Spanish (Costa Rica)' },
        { code: 'es-EC', name: 'Spanish (Ecuador)' },
        { code: 'es-SV', name: 'Spanish (El Salvador)' },
        { code: 'es-ES', name: 'Spanish (Spain)' },
        { code: 'es-US', name: 'Spanish (United States)' },
        { code: 'es-GT', name: 'Spanish (Guatemala)' },
        { code: 'es-HN', name: 'Spanish (Honduras)' },
        { code: 'es-MX', name: 'Spanish (Mexico)' },
        { code: 'es-NI', name: 'Spanish (Nicaragua)' },
        { code: 'es-PA', name: 'Spanish (Panama)' },
        { code: 'es-PY', name: 'Spanish (Paraguay)' },
        { code: 'es-PE', name: 'Spanish (Peru)' },
        { code: 'es-PR', name: 'Spanish (Puerto Rico)' },
        { code: 'es-DO', name: 'Spanish (Dominican Republic)' },
        { code: 'es-UY', name: 'Spanish (Uruguay)' },
        { code: 'es-VE', name: 'Spanish (Venezuela)' },
        { code: 'eu-ES', name: 'Basque (Spain)' },
        { code: 'fil-PH', name: 'Filipino (Philippines)' },
        { code: 'fr-CA', name: 'French (Canada)' },
        { code: 'fr-FR', name: 'French (France)' },
        { code: 'gl-ES', name: 'Galician (Spain)' },
        { code: 'ka-GE', name: 'Georgian (Georgia)' },
        { code: 'gu-IN', name: 'Gujarati (India)' },
        { code: 'hr-HR', name: 'Croatian (Croatia)' },
        { code: 'zu-ZA', name: 'Zulu (South Africa)' },
        { code: 'is-IS', name: 'Icelandic (Iceland)' },
        { code: 'it-IT', name: 'Italian (Italy)' },
        { code: 'jv-ID', name: 'Javanese (Indonesia)' },
        { code: 'kn-IN', name: 'Kannada (India)' },
        { code: 'km-KH', name: 'Khmer (Cambodia)' },
        { code: 'lo-LA', name: 'Lao (Laos)' },
        { code: 'lv-LV', name: 'Latvian (Latvia)' },
        { code: 'lt-LT', name: 'Lithuanian (Lithuania)' },
        { code: 'hu-HU', name: 'Hungarian (Hungary)' },
        { code: 'ml-IN', name: 'Malayalam (India)' },
        { code: 'mr-IN', name: 'Marathi (India)' },
        { code: 'nl-NL', name: 'Dutch (Netherlands)' },
        { code: 'ne-NP', name: 'Nepali (Nepal)' },
        { code: 'no-NO', name: 'Norwegian (Norway)' },
        { code: 'pl-PL', name: 'Polish (Poland)' },
        { code: 'pt-BR', name: 'Portuguese (Brazil)' },
        { code: 'pt-PT', name: 'Portuguese (Portugal)' },
        { code: 'pa-IN', name: 'Punjabi (India)' },
        { code: 'ro-RO', name: 'Romanian (Romania)' },
        { code: 'ru-RU', name: 'Russian (Russia)' },
        { code: 'sr-RS', name: 'Serbian (Serbia)' },
        { code: 'si-LK', name: 'Sinhala (Sri Lanka)' },
        { code: 'sk-SK', name: 'Slovak (Slovakia)' },
        { code: 'sl-SI', name: 'Slovenian (Slovenia)' },
        { code: 'su-ID', name: 'Sundanese (Indonesia)' },
        { code: 'sw-TZ', name: 'Swahili (Tanzania)' },
        { code: 'sw-KE', name: 'Swahili (Kenya)' },
        { code: 'fi-FI', name: 'Finnish (Finland)' },
        { code: 'sv-SE', name: 'Swedish (Sweden)' },
        { code: 'ta-IN', name: 'Tamil (India)' },
        { code: 'ta-SG', name: 'Tamil (Singapore)' },
        { code: 'ta-LK', name: 'Tamil (Sri Lanka)' },
        { code: 'ta-MY', name: 'Tamil (Malaysia)' },
        { code: 'te-IN', name: 'Telugu (India)' },
        { code: 'th-TH', name: 'Thai (Thailand)' },
        { code: 'tr-TR', name: 'Turkish (Turkey)' },
        { code: 'uk-UA', name: 'Ukrainian (Ukraine)' },
        { code: 'ur-PK', name: 'Urdu (Pakistan)' },
        { code: 'ur-IN', name: 'Urdu (India)' },
        { code: 'uz-UZ', name: 'Uzbek (Uzbekistan)' },
        { code: 'vi-VN', name: 'Vietnamese (Vietnam)' },
        { code: 'cy-GB', name: 'Welsh (United Kingdom)' },
        { code: 'xh-ZA', name: 'Xhosa (South Africa)' },
        { code: 'yi-DE', name: 'Yiddish (Germany)' },
        { code: 'yo-NG', name: 'Yoruba (Nigeria)' },
        { code: 'zu-ZA', name: 'Zulu (South Africa)' }
    ];

    //const [isRecording, setIsRecording] = useState(false);

    // Function to handle Speech-to-Text conversion
    const handleSpeechToText = () => {
        const recognition = new window.webkitSpeechRecognition() || window.SpeechRecognition();
        recognition.lang = speechRecognitionLang; // Set language for speech recognition

        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            setTextInput(speechToText); // Set the recognized text to input field
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.start(); // Start speech recognition  
    };

    useEffect(() => {
        // Load voices when component mounts
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            console.log(voices);
        };      
    }, []);

    return (
        <div className="layoutDetect">
            <div className="container-xxl">
                <h2 className="text-center mb-4">Detect & Translate</h2>
                <div className="row wrap">
                    <span className="tool">
                        <label htmlFor="file" className="btn btn-primary "><MdInsertPhoto className="fs-4" /> Photo</label>
                        <input id="file" type="file" accept="image/*" onChange={(e)=>handleChangeImg(e)} />
                    </span>
                    <div className="area-select">
                        <select
                            className="form-select form-select-micro"
                            aria-label="Select recognition language"
                            value={speechRecognitionLang}
                            onChange={(e) => setSpeechRecognitionLang(e.target.value)}
                        >
                            {languages.map((language, index) => (
                                <option key={index} value={language.code}>{language.name}</option>
                            ))}
                        </select>
                        <p className="col-md-12 text-center swap-icon"><button onClick={() => handleSwap()} className="btn btn-success"><IoIosSwap className="fs-4"/></button></p>
                        <select
                            className="form-select form-select-output"
                            aria-label="Default select example"
                            value={targetLanguage} 
                            onChange={(e) => setTargetLanguage(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="af">Afrikaans</option>
                            <option value="am">Amharic</option>
                            <option value="ar">Arabic</option>
                            <option value="az">Azerbaijani</option>
                            <option value="be">Belarusian</option>
                            <option value="bg">Bulgarian</option>
                            <option value="bn">Bengali</option>
                            <option value="bs">Bosnian</option>
                            <option value="ca">Catalan</option>
                            <option value="ceb">Cebuano</option>
                            <option value="co">Corsican</option>
                            <option value="cs">Czech</option>
                            <option value="cy">Welsh</option>
                            <option value="da">Danish</option>
                            <option value="de">German</option>
                            <option value="el">Greek</option>
                            <option value="eo">Esperanto</option>
                            <option value="es">Spanish</option>
                            <option value="et">Estonian</option>
                            <option value="eu">Basque</option>
                            <option value="fa">Persian</option>
                            <option value="fi">Finnish</option>
                            <option value="fr">French</option>
                            <option value="fy">Frisian</option>
                            <option value="ga">Irish</option>
                            <option value="gd">Scots Gaelic</option>
                            <option value="gl">Galician</option>
                            <option value="gu">Gujarati</option>
                            <option value="ha">Hausa</option>
                            <option value="haw">Hawaiian</option>
                            <option value="he">Hebrew</option>
                            <option value="hi">Hindi</option>
                            <option value="hmn">Hmong</option>
                            <option value="hr">Croatian</option>
                            <option value="ht">Haitian Creole</option>
                            <option value="hu">Hungarian</option>
                            <option value="hy">Armenian</option>
                            <option value="id">Indonesian</option>
                            <option value="ig">Igbo</option>
                            <option value="is">Icelandic</option>
                            <option value="it">Italian</option>
                            <option value="iw">Hebrew</option>
                            <option value="ja">Japanese</option>
                            <option value="jw">Javanese</option>
                            <option value="ka">Georgian</option>
                            <option value="kk">Kazakh</option>
                            <option value="km">Khmer</option>
                            <option value="kn">Kannada</option>
                            <option value="ko">Korean</option>
                            <option value="ku">Kurdish (Kurmanji)</option>
                            <option value="ky">Kyrgyz</option>
                            <option value="la">Latin</option>
                            <option value="lb">Luxembourgish</option>
                            <option value="lo">Lao</option>
                            <option value="lt">Lithuanian</option>
                            <option value="lv">Latvian</option>
                            <option value="mg">Malagasy</option>
                            <option value="mi">Maori</option>
                            <option value="mk">Macedonian</option>
                            <option value="ml">Malayalam</option>
                            <option value="mn">Mongolian</option>
                            <option value="mr">Marathi</option>
                            <option value="ms">Malay</option>
                            <option value="mt">Maltese</option>
                            <option value="my">Myanmar (Burmese)</option>
                            <option value="ne">Nepali</option>
                            <option value="nl">Dutch</option>
                            <option value="no">Norwegian</option>
                            <option value="ny">Chichewa</option>
                            <option value="or">Odia</option>
                            <option value="pa">Punjabi</option>
                            <option value="pl">Polish</option>
                            <option value="ps">Pashto</option>
                            <option value="pt">Portuguese</option>
                            <option value="ro">Romanian</option>
                            <option value="ru">Russian</option>
                            <option value="sd">Sindhi</option>
                            <option value="si">Sinhala</option>
                            <option value="sk">Slovak</option>
                            <option value="sl">Slovenian</option>
                            <option value="sm">Samoan</option>
                            <option value="sn">Shona</option>
                            <option value="so">Somali</option>
                            <option value="sq">Albanian</option>
                            <option value="sr">Serbian</option>
                            <option value="st">Sesotho</option>
                            <option value="su">Sundanese</option>
                            <option value="sv">Swedish</option>
                            <option value="sw">Swahili</option>
                            <option value="ta">Tamil</option>
                            <option value="te">Telugu</option>
                            <option value="tg">Tajik</option>
                            <option value="th">Thai</option>
                            <option value="tl">Filipino</option>
                            <option value="tr">Turkish</option>
                            <option value="ug">Uyghur</option>
                            <option value="uk">Ukrainian</option>
                            <option value="ur">Urdu</option>
                            <option value="uz">Uzbek</option>
                            <option value="vi">Vietnamese</option>
                            <option value="xh">Xhosa</option>
                            <option value="yi">Yiddish</option>
                            <option value="yo">Yoruba</option>
                            <option value="zh-cn">Chinese (Simplified)</option>
                            <option value="zh-tw">Chinese (Traditional)</option>
                            <option value="zu">Zulu</option>
                        </select>
                    </div>
                    <textarea onChange={(e) => setTextInput(e.target.value)} value={textInput} placeholder="Enter text to translate" className="text-input" id=""></textarea>
                    <div className="mx-0 text-output" id="">{translated}</div>
                    <i className="icon-micro" onClick={handleSpeechToText}><HiOutlineMicrophone /></i>
                    <i className="icon-speaker" onClick={() => readInput(textInput)} ><HiOutlineSpeakerWave /></i>
                    <i className="icon-speaker-output" onClick={() => readInput(translated)} ><HiOutlineSpeakerWave /></i>
                    <div className="mt-2 p-0">
                    <span><button onClick={handleDetect} className="buttonDetect fs-6 col-md-1 col-3 btn btn-success">{isLoadingDetect ? <AiOutlineLoading3Quarters /> : 'Detect'}</button></span>
                    <span className="mx-2"><button onClick={handleTranslate} className="buttonDetect col-md-1 fs-6 col-3 btn btn-success">{isLoadingTrans ? <AiOutlineLoading3Quarters /> : 'Translate'}</button></span>
                    </div>
                </div>
                <hr />
                <div>
                    {selectImg &&
                        <div className="img-input col-10 mx-auto pb-3 text-center"><img className="pb-1" src={URL.createObjectURL(selectImg)} alt="" /></div> 
                    }

                    <div className="wrap-detect">
                    {/* Hiển thị kết quả detect ngôn ngữ */}
                    {languageResults.length > 0 &&
                        <div className="col-md-6 p-3 backgroundBox mx-auto">
                            <h2 className="">Language Results</h2>
                            <ul className="text-start ">
                                {languageResults.map((result, index) => (
                                    <li key={index}>
                                        <p><strong>Text:</strong> {result.text}</p>
                                        <p><strong>Detect:</strong> {getLanguageName(result.language)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }

                    {languagePercentages.length > 0 &&
                        <div className="col-md-6 p-3 backgroundBox mx-auto">
                            <h2 className="">Language Percentages</h2>
                            <ul className="">
                                {languagePercentages.map((result, index) => (
                                    <li key={index}>
                                        <p><strong>{result.language}:</strong> {result.percentage.toFixed(2)}%</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    </div>
                </div>
                    
            </div>
        </div>
    );
}

export default layoutDetect;
