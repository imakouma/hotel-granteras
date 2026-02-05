'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, type LanguageCode } from '@/contexts/LanguageContext';

const translations = {
  ja: {
    hotelName: '',
    hotelTitle: 'ホテルグランテラス仙台国分町',
    heroTitle: 'ホテル館内のご案内',
    welcomeMessage: '本日は「ホテルグランテラス仙台国分町」をご利用いただき誠にありがとうございます。',
    welcomeMessage2: 'ご不明な点がございましたらフロントスタッフまでお気軽にお尋ねください。',
    restaurantCoupon: '飲食店クーポン',
    checkInOut: '入退館時間',
    bath: '1階 ロビー・施設',
    breakfast: '朝食',
    dinner: '夕食・お得なクーポン',
    service: 'サービスコーナー',
    wifi: 'Wi-Fi',
    lighting: '室内照明',
    longstay: '連泊のお客様へ',
    lost: 'お忘れ物について',
    quickCheckin: '快速チェックイン',
    dinnerTab: '夕食・お得なクーポン',
    serviceTab: 'サービスコーナー',
    close: '閉じる',
    checkIn: 'チェックイン',
    checkOut: 'チェックアウト',
    planNote: '※プランによって時間が異なる場合がございます。',
    bathTitle: '1階 ロビー・施設',
    bathDescription: '男女別大浴場 9F',
    operatingHours: '営業時間:',
    bathHours: '15:00~翌10:00',
    saunaNote: '(サウナのみ1:00~5:00停止)',
    notice: 'ご注意',
    bathNotice1: '※タオル、アメニティは各自お部屋からお持ちください。',
    bathNotice2: '※女性大浴場へ入場する際は暗証番号が必要です。暗証番号はフロントにてお渡しします。',
    freeService: '無料サービス',
    bathServiceDesc: '乳酸菌飲料とアイスキャンディーを無料で提供しております。',
    breakfastTitle: 'ご朝食 (1F レストラン)',
    breakfastPrice: '大人 1,200円（税込）／子供（小学生）800円（税込）',
    breakfastHours: '6:15~9:30 (最終入店9:00)',
    breakfastNote1: '※満席の場合はお待ちいただくことがございます。',
    breakfastNote2: '※混雑状況により営業時間を変更させていただく場合がございます。',
    sobaTitle: '■夜鳴きそば (ハーフサイズ) / 無料',
    sobaHours: '21:30~23:00',
    sobaNote: '※営業時間は変更になる場合がございます。',
    serviceTitle: 'サービスコーナー',
    vendingMachine: '自動販売機',
    alcoholNote: '(アルコール類は5・7・9F)',
    microwave: '電子レンジ',
    iceMaker: '製氷機',
    smoking: '喫煙コーナー',
    trouserPress: 'ズボンプレッサー',
    trouserPressLocation: '各階エレベーター前',
    laundry: 'ランドリーコーナー',
    laundryNote: '※洗濯機/1回200円 乾燥機/10分100円（洗剤はフロントにて無料配布）',
    wifiTitle: 'Wi-Fi',
    password: 'Password :',
    lostTitle: 'お忘れ物',
    lostText1: '忘れ物等については、原則ホテルからの連絡は致しません。',
    lostText2: 'またご連絡が無い場合は、遺失物法に基づき3ヶ月経過後処分させていただきます。',
    lostText3: 'ただし、飲食物につきましては即日処分させていただきます。',
    lightingTitle: '室内照明',
    lightingDesc: '入室後、入口脇の電源ソケットにお部屋のキーホルダーを差し込む事で室内照明は点灯致します。',
    lightingNote: '※キーを電源ソケットに差し込みます。',
    longstayTitle: '連泊のお客様へ',
    sheetExchange: '清掃をご希望の方は緑のマグネット「清掃してください」を明朝9時までに入口ドア廊下側へ貼付してください。',
    noCleaning: '清掃不要の方は青のマグネット「起こさないでください」を入口ドア廊下側へ貼付してください。マグネットが貼られていない場合は清掃を行わず、タオル類のみドア前にご用意いたします。衛生面の観点から清掃は3日に1回（2泊目まではタオル類のみ交換、3泊目は清掃、4泊目以降は繰り返し）となります。',
    officialHP: '公式HPはこちら',
    preparing: '詳細情報は準備中です。',
  },
  en: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Hotel Guide',
    welcomeMessage: 'Thank you very much for staying with us today.',
    welcomeMessage2: 'If you have any questions, please feel free to ask our front desk staff.',
    restaurantCoupon: 'Restaurant Coupon',
    checkInOut: 'Check-in/Check-out',
    bath: 'Public Bath',
    breakfast: 'Breakfast',
    dinner: 'Dinner & Coupons',
    service: 'Service Corner',
    wifi: 'Wi-Fi',
    lighting: 'Room Lighting',
    longstay: 'For Long-term Guests',
    lost: 'Lost & Found',
    quickCheckin: 'Quick Check-in',
    dinnerTab: 'Dinner & Coupons',
    serviceTab: 'Service Corner',
    close: 'Close',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '*Times may vary depending on the plan.',
    bathTitle: 'Public Bath',
    bathDescription: 'Separate men\'s and women\'s public bath 9F',
    operatingHours: 'Operating Hours:',
    bathHours: '15:00~Next day 10:00',
    saunaNote: '(Sauna only: 1:00~5:00 closed)',
    notice: 'Notice',
    bathNotice1: '*Please bring your own towels and amenities from your room.',
    bathNotice2: '*A passcode is required to enter the women\'s public bath. The passcode will be provided at the front desk.',
    freeService: 'Free Service',
    bathServiceDesc: 'We provide free lactic acid drinks and ice candy.',
    breakfastTitle: 'Breakfast (1F Restaurant)',
    breakfastPrice: '/ $2,300',
    breakfastHours: '6:15~9:30 (Last entry 9:00)',
    breakfastNote1: '*You may be asked to wait if the restaurant is full.',
    breakfastNote2: '*Operating hours may change depending on congestion.',
    serviceTitle: 'Service Corner',
    vendingMachine: 'Vending Machine',
    alcoholNote: '(Alcoholic beverages: 5F, 9F)',
    microwave: 'Microwave',
    iceMaker: 'Ice Maker',
    smoking: 'Smoking Area',
    trouserPress: 'Trouser Press',
    trouserPressLocation: 'In front of elevator on each floor',
    laundry: 'Laundry Corner',
    laundryNote: '*Detergent, washing machine/free, dryer/paid ($100 per 30 minutes)',
    wifiTitle: 'Wi-Fi',
    password: 'Password:',
    lostTitle: 'Lost & Found',
    lostText1: 'As a rule, the hotel will not contact you regarding lost items.',
    lostText2: 'If there is no contact, items will be disposed of after 3 months in accordance with the Lost Property Act.',
    lostText3: 'However, food and beverages will be disposed of on the same day.',
    lightingTitle: 'Room Lighting',
    lightingDesc: 'After entering the room, insert your room key holder into the power socket next to the entrance to turn on the room lighting.',
    lightingNote: '*Insert the key into the power socket.',
    longstayTitle: 'For Long-term Guests',
    sheetExchange: 'Guests who wish to exchange sheets, futon covers, and pillowcases, please display the \"WECO Card\" on the bed. We will not exchange them if the card is not displayed. (We will exchange towels and room wear.)',
    noCleaning: 'Guests who do not need cleaning, please display the green \"WECO\" card on the corridor side, which is located on the inside of the entrance door. In that case, we will not clean or enter the room.',
    officialHP: 'Official Website',
    preparing: 'Detailed information is being prepared.',
  },
  zh: {
    hotelName: '',
    hotelTitle: '',
    heroTitle: '',
    welcomeMessage: '',
    welcomeMessage2: '',
    restaurantCoupon: '',
    checkInOut: '',
    bath: '',
    breakfast: '',
    dinner: '',
    service: '',
    wifi: '',
    lighting: '',
    longstay: '',
    lost: '',
    quickCheckin: '',
    dinnerTab: '',
    serviceTab: '',
    close: '',
    checkIn: '',
    checkOut: '',
    planNote: '',
    bathTitle: '',
    bathDescription: '',
    operatingHours: '',
    bathHours: '',
    saunaNote: '',
    notice: '',
    bathNotice1: '',
    bathNotice2: '',
    freeService: '',
    bathServiceDesc: '',
    breakfastTitle: '(1F)',
    breakfastPrice: '/ 2,300',
    breakfastHours: '6:15~9:30 (9:00)',
    breakfastNote1: '',
    breakfastNote2: '',
    serviceTitle: '',
    vendingMachine: '',
    alcoholNote: '',
    microwave: '',
    iceMaker: '',
    smoking: '',
    trouserPress: '',
    trouserPressLocation: '',
    laundry: '',
    laundryNote: '',
    wifiTitle: '',
    password: '',
    lostTitle: '',
    lostText1: '',
    lostText2: '',
    lostText3: '',
    lightingTitle: '',
    lightingDesc: '',
    lightingNote: '',
    longstayTitle: '',
    sheetExchange: '',
    noCleaning: '',
    officialHP: '',
    preparing: '',
  },
  ko: {
    hotelName: '',
    hotelTitle: '',
    heroTitle: '',
    welcomeMessage: '',
    welcomeMessage2: '',
    restaurantCoupon: '',
    checkInOut: '',
    bath: '',
    breakfast: '',
    dinner: '',
    service: '',
    wifi: '',
    lighting: '',
    longstay: '',
    lost: '',
    quickCheckin: '',
    dinnerTab: '',
    serviceTab: '',
    close: '',
    checkIn: '',
    checkOut: '',
    planNote: '',
    bathTitle: '',
    bathDescription: '',
    operatingHours: '',
    bathHours: '',
    saunaNote: '',
    notice: '',
    bathNotice1: '',
    bathNotice2: '',
    freeService: '',
    bathServiceDesc: '',
    breakfastTitle: '(1F)',
    breakfastPrice: '/ 2,300',
    breakfastHours: '6:15~9:30 (9:00)',
    breakfastNote1: '',
    breakfastNote2: '',
    serviceTitle: '',
    vendingMachine: '',
    alcoholNote: '',
    microwave: '',
    iceMaker: '',
    smoking: '',
    trouserPress: '',
    trouserPressLocation: '',
    laundry: '',
    laundryNote: '',
    wifiTitle: '',
    password: '',
    lostTitle: '',
    lostText1: '',
    lostText2: '',
    lostText3: '',
    lightingTitle: '',
    lightingDesc: '',
    lightingNote: '',
    longstayTitle: '',
    sheetExchange: '',
    noCleaning: '',
    officialHP: '',
    preparing: '',
  },
  fr: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Guide de l\'hôtel',
    welcomeMessage: 'Merci beaucoup d\'avoir séjourné aujourd\'hui.',
    welcomeMessage2: 'Si vous avez des questions, n\'hésitez pas à contacter notre réception.',
    restaurantCoupon: 'Coupon Restaurant',
    checkInOut: 'Enregistrement/Départ',
    bath: 'Bain public',
    breakfast: 'Petit-déjeuner',
    dinner: 'Dîner & Coupons',
    service: 'Coin Service',
    wifi: 'Wi-Fi',
    lighting: 'Éclairage intérieur',
    longstay: 'Pour les clients longue durée',
    lost: 'Objets trouvés',
    quickCheckin: 'Check-in rapide',
    dinnerTab: 'Dîner & Coupons',
    serviceTab: 'Coin Service',
    close: 'Fermer',
    checkIn: 'Enregistrement',
    checkOut: 'Départ',
    planNote: '*Les heures peuvent varier selon le plan.',
    bathTitle: 'Bain public',
    bathDescription: 'Bain public séparé hommes/femmes 9F',
    operatingHours: 'Heures d\'ouverture:',
    bathHours: '15:00~Le lendemain 10:00',
    saunaNote: '(Sauna uniquement: 1:00~5:00 fermé)',
    notice: 'Avis',
    bathNotice1: '*Veuillez apporter vos propres serviettes et articles de toilette depuis votre chambre.',
    bathNotice2: '*Un code d\'accès est requis pour entrer dans le bain public des femmes. Le code sera fourni à la réception.',
    freeService: 'Service gratuit',
    bathServiceDesc: 'Nous fournissons gratuitement des boissons lactiques et des bonbons glacés.',
    breakfastTitle: 'Petit-déjeuner (Restaurant 1F)',
    breakfastPrice: '/ ¥2,300',
    breakfastHours: '6:15~9:30 (Dernière entrée 9:00)',
    breakfastNote1: '*Vous pourriez être invité à attendre si le restaurant est complet.',
    breakfastNote2: '*Les heures d\'ouverture peuvent changer selon l\'affluence.',
    serviceTitle: 'Coin Service',
    vendingMachine: 'Distributeur automatique',
    alcoholNote: '(Boissons alcoolisées: 5F, 9F)',
    microwave: 'Micro-ondes',
    iceMaker: 'Machine à glaçons',
    smoking: 'Espace fumeur',
    trouserPress: 'Presse-pantalon',
    trouserPressLocation: 'Devant l\'ascenseur à chaque étage',
    laundry: 'Coin Laverie',
    laundryNote: '*Détergent, machine à laver/gratuit, sèche-linge/payant (¥100 par 30 minutes)',
    wifiTitle: 'Wi-Fi',
    password: 'Mot de passe:',
    lostTitle: 'Objets trouvés',
    lostText1: 'En principe, l\'hôtel ne vous contactera pas concernant les objets perdus.',
    lostText2: 'Si non contact, les objets seront éliminés après 3 mois conformément à la Loi sur les objets perdus.',
    lostText3: 'Cependant, les aliments et boissons seront éliminés le jour même.',
    lightingTitle: 'Éclairage intérieur',
    lightingDesc: 'Après être entré dans la chambre, insérez le porte-clés de votre chambre dans la prise électrique à côté de l\'entrée pour allumer l\'éclairage de la chambre.',
    lightingNote: '*Insérez la clé dans la prise électrique.',
    longstayTitle: 'Pour les clients longue durée',
    sheetExchange: 'Les clients qui souhaitent échanger les draps, housses de futon et taies d\'oreiller, veuillez afficher la \"Carte WECO\" sur le lit. Nous ne les échangerons pas si la carte n\'est pas affichée. (Nous échangerons les serviettes et les vêtements de chambre.)',
    noCleaning: 'Les clients qui n\'ont pas besoin de nettoyage, veuillez afficher la carte verte \"WECO\" du côté du couloir, qui se trouve à l\'intérieur de la porte d\'entrée. Dans ce cas, nous ne nettoierons pas et n\'entrerons pas dans la chambre.',
    officialHP: 'Site Web officiel',
    preparing: 'Les informations détaillées sont en cours de préparation.',
  },
  de: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Hotel-Führer',
    welcomeMessage: 'Vielen Dank, dass Sie heute bei uns übernachtet haben.',
    welcomeMessage2: 'Wenn Sie Fragen haben, wenden Sie sich bitte an unsere Rezeption.',
    restaurantCoupon: 'Restaurant-Gutschein',
    checkInOut: 'Check-in/Check-out',
    bath: 'Öffentliches Bad',
    breakfast: 'Frühstück',
    dinner: 'Abendessen & Gutscheine',
    service: 'Service-Ecke',
    wifi: 'Wi-Fi',
    lighting: 'Raumbeleuchtung',
    longstay: 'Für Langzeitgäste',
    lost: 'Fundsachen',
    quickCheckin: 'Schnell-Check-in',
    dinnerTab: 'Abendessen & Gutscheine',
    serviceTab: 'Service-Ecke',
    close: 'Schließen',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '*Die Zeiten können je nach Plan variieren.',
    bathTitle: 'Öffentliches Bad',
    bathDescription: 'Getrenntes Männer- und Frauenbad 9F',
    operatingHours: 'Öffnungszeiten:',
    bathHours: '15:00~Nächster Tag 10:00',
    saunaNote: '(Nur Sauna: 1:00~5:00 geschlossen)',
    notice: 'Hinweis',
    bathNotice1: '*Bitte bringen Sie Ihre eigenen Handtücher und Toilettenartikel aus Ihrem Zimmer mit.',
    bathNotice2: '*Ein Passcode ist erforderlich, um das Frauenbad zu betreten. Der Passcode wird an der Rezeption bereitgestellt.',
    freeService: 'Kostenloser Service',
    bathServiceDesc: 'Wir bieten kostenlos Milchsäuregetränke und Eisbonbons an.',
    breakfastTitle: 'Frühstück (Restaurant 1F)',
    breakfastPrice: '/ ¥2,300',
    breakfastHours: '6:15~9:30 (Letzter Einlass 9:00)',
    breakfastNote1: '*Sie könnten gebeten werden zu warten, wenn das Restaurant voll ist.',
    breakfastNote2: '*Die Öffnungszeiten können sich je nach Andrang ändern.',
    serviceTitle: 'Service-Ecke',
    vendingMachine: 'Verkaufsautomat',
    alcoholNote: '(Alkoholische Getränke: 5F, 9F)',
    microwave: 'Mikrowelle',
    iceMaker: 'Eismaschine',
    smoking: 'Raucherbereich',
    trouserPress: 'Hosenpresse',
    trouserPressLocation: 'Vor dem Aufzug auf jeder Etage',
    laundry: 'Waschecke',
    laundryNote: '*Waschmittel, Waschmaschine/kostenlos, Trockner/gebührenpflichtig (¥100 pro 30 Minuten)',
    wifiTitle: 'Wi-Fi',
    password: 'Passwort:',
    lostTitle: 'Fundsachen',
    lostText1: 'Grundsätzlich wird das Hotel Sie nicht bezüglich verlorener Gegenstände kontaktieren.',
    lostText2: 'Wenn kein Kontakt besteht, werden die Gegenstände nach 3 Monaten gemäß dem Fundrecht entsorgt.',
    lostText3: 'Lebensmittel und Getränke werden jedoch am selben Tag entsorgt.',
    lightingTitle: 'Raumbeleuchtung',
    lightingDesc: 'Nach dem Betreten des Zimmers stecken Sie den Zimmerschlüsselhalter in die Steckdose neben dem Eingang, um die Raumbeleuchtung einzuschalten.',
    lightingNote: '*Stecken Sie den Schlüssel in die Steckdose.',
    longstayTitle: 'Für Langzeitgäste',
    sheetExchange: 'Gäste, die Bettwäsche, Futonbezüge und Kissenbezüge wechseln möchten, bitte zeigen Sie die \"WECO-Karte\" auf dem Bett. Wir tauschen sie nicht aus, wenn die Karte nicht angezeigt wird. (Wir tauschen Handtücher und Nachtwäsche aus.)',
    noCleaning: 'Gäste, die keine Reinigung benötigen, bitte zeigen Sie die grüne \"WECO\"-Karte auf der Korridorseite, die sich an der Innenseite der Eingangstür befindet. In diesem Fall reinigen wir nicht und betreten das Zimmer nicht.',
    officialHP: 'Offizielle Website',
    preparing: 'Detaillierte Informationen werden vorbereitet.',
  },
  es: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Guía del hotel',
    welcomeMessage: 'Muchas gracias por alojarse con nosotros hoy.',
    welcomeMessage2: 'Si tiene alguna pregunta, no dude en consultar a nuestro personal de recepción.',
    restaurantCoupon: 'Cupón de restaurante',
    checkInOut: 'Registro/Salida',
    bath: 'Baño público',
    breakfast: 'Desayuno',
    dinner: 'Cena & Cupones',
    service: 'Rincón de servicio',
    wifi: 'Wi-Fi',
    lighting: 'Iluminación interior',
    longstay: 'Para huéspedes de larga estancia',
    lost: 'Objetos perdidos',
    quickCheckin: 'Check-in rápido',
    dinnerTab: 'Cena & Cupones',
    serviceTab: 'Rincón de servicio',
    close: 'Cerrar',
    checkIn: 'Registro',
    checkOut: 'Salida',
    planNote: '*Los horarios pueden variar según el plan.',
    bathTitle: 'Baño público',
    bathDescription: 'Baño público separado para hombres y mujeres 9F',
    operatingHours: 'Horario de funcionamiento:',
    bathHours: '15:00~Día siguiente 10:00',
    saunaNote: '(Solo sauna: 1:00~5:00 cerrado)',
    notice: 'Aviso',
    bathNotice1: '*Por favor traiga sus propias toallas y artículos de aseo desde su habitación.',
    bathNotice2: '*Se requiere un código de acceso para entrar al baño público de mujeres. El código se proporcionará en la recepción.',
    freeService: 'Servicio gratuito',
    bathServiceDesc: 'Ofrecemos gratuitamente bebidas lácteas y caramelos de hielo.',
    breakfastTitle: 'Desayuno (Restaurante 1F)',
    breakfastPrice: '/ ¥2,300',
    breakfastHours: '6:15~9:30 (Última entrada 9:00)',
    breakfastNote1: '*Es posible que se le pida que espere si el restaurante está lleno.',
    breakfastNote2: '*El horario puede cambiar según la congestión.',
    serviceTitle: 'Rincón de servicio',
    vendingMachine: 'Máquina expendedora',
    alcoholNote: '(Bebidas alcohólicas: 5F, 9F)',
    microwave: 'Microondas',
    iceMaker: 'Máquina de hielo',
    smoking: 'Área de fumadores',
    trouserPress: 'Prensa de pantalones',
    trouserPressLocation: 'Frente al ascensor en cada piso',
    laundry: 'Rincón de lavandería',
    laundryNote: '*Detergente, lavadora/gratis, secadora/de pago (¥100 por 30 minutos)',
    wifiTitle: 'Wi-Fi',
    password: 'Contraseña:',
    lostTitle: 'Objetos perdidos',
    lostText1: 'Como regla, el hotel no se pondrá en contacto con usted sobre objetos perdidos.',
    lostText2: 'Si no hay contacto, los objetos se eliminarán después de 3 meses de acuerdo con la Ley de Objetos Perdidos.',
    lostText3: 'Sin embargo, los alimentos y bebidas se eliminarán el mismo día.',
    lightingTitle: 'Iluminación interior',
    lightingDesc: 'Después de entrar en la habitación, inserte el portallaves de su habitación en el enchufe eléctrico junto a la entrada para encender la iluminación de la habitación.',
    lightingNote: '*Inserte la llave en el enchufe eléctrico.',
    longstayTitle: 'Para huéspedes de larga estancia',
    sheetExchange: 'Los huéspedes que deseen cambiar las sábanas, fundas de futón y fundas de almohada, por favor muestren la \"Tarjeta WECO\" en la cama. No las cambiaremos si la tarjeta no se muestra. (Cambiaremos toallas y ropa de habitación.)',
    noCleaning: 'Los huéspedes que no necesiten limpieza, por favor muestren la tarjeta verde \"WECO\" en el lado del pasillo, que se encuentra en el interior de la puerta de entrada. En ese caso, no limpiaremos ni entraremos en la habitación.',
    officialHP: 'Sitio web oficial',
    preparing: 'La información detallada se está preparando.',
  },
  it: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Guida dell\'hotel',
    welcomeMessage: 'Grazie mille per aver soggiornato con noi oggi.',
    welcomeMessage2: 'Se ha domande, non esiti a contattare il nostro personale della reception.',
    restaurantCoupon: 'Buono ristorante',
    checkInOut: 'Check-in/Check-out',
    bath: 'Bagno pubblico',
    breakfast: 'Colazione',
    dinner: 'Cena & Buoni',
    service: 'Angolo servizio',
    wifi: 'Wi-Fi',
    lighting: 'Illuminazione interna',
    longstay: 'Per ospiti soggiorno prolungato',
    lost: 'Oggetti smarriti',
    quickCheckin: 'Check-in rapido',
    dinnerTab: 'Cena & Buoni',
    serviceTab: 'Angolo servizio',
    close: 'Chiudi',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '*Gli orari possono variare a seconda del piano.',
    bathTitle: 'Bagno pubblico',
    bathDescription: 'Bagno pubblico separato uomini/donne 9F',
    operatingHours: 'Orari di apertura:',
    bathHours: '15:00~Giorno successivo 10:00',
    saunaNote: '(Solo sauna: 1:00~5:00 chiuso)',
    notice: 'Avviso',
    bathNotice1: '*Si prega di portare i propri asciugamani e articoli da toilette dalla propria camera.',
    bathNotice2: '*È richiesto un codice di accesso per entrare nel bagno pubblico delle donne. Il codice verrà fornito alla reception.',
    freeService: 'Servizio gratuito',
    bathServiceDesc: 'Forniamo gratuitamente bevande lattiche e caramelle ghiacciate.',
    breakfastTitle: 'Colazione (Ristorante 1F)',
    breakfastPrice: '/ ¥2,300',
    breakfastHours: '6:15~9:30 (Ultimo ingresso 9:00)',
    breakfastNote1: '*Potrebbe essere richiesto di attendere se il ristorante è pieno.',
    breakfastNote2: '*Gli orari di apertura possono cambiare a seconda della congestione.',
    serviceTitle: 'Angolo servizio',
    vendingMachine: 'Distributore automatico',
    alcoholNote: '(Beveraggi alcolici: 5F, 9F)',
    microwave: 'Forno a microonde',
    iceMaker: 'Macchina per il ghiaccio',
    smoking: 'Area fumatori',
    trouserPress: 'Stiratrice pantaloni',
    trouserPressLocation: 'Davanti all\'ascensore su ogni piano',
    laundry: 'Angolo lavanderia',
    laundryNote: '*Detergente, lavatrice/gratis, asciugatrice/a pagamento (¥100 per 30 minuti)',
    wifiTitle: 'Wi-Fi',
    password: 'Password:',
    lostTitle: 'Oggetti smarriti',
    lostText1: 'Di norma, l\'hotel non vi contatterà riguardo agli oggetti smarriti.',
    lostText2: 'Se non c\'è contatto, gli oggetti verranno eliminati dopo 3 mesi secondo la Legge sugli Oggetti Smarriti.',
    lostText3: 'Tuttavia, cibi e bevande verranno eliminati lo stesso giorno.',
    lightingTitle: 'Illuminazione interna',
    lightingDesc: 'Dopo essere entrati nella camera, inserire il portachiavi della camera nella presa elettrica accanto all\'ingresso per accendere l\'illuminazione della camera.',
    lightingNote: '*Inserire la chiave nella presa elettrica.',
    longstayTitle: 'Per ospiti soggiorno prolungato',
    sheetExchange: 'Gli ospiti che desiderano cambiare lenzuola, coperture futon e federe, si prega di mostrare la \"Carta WECO\" sul letto. Non le cambieremo se la carta non viene mostrata. (Cambieremo asciugamani e abbigliamento da camera.)',
    noCleaning: 'Gli ospiti che non necessitano di pulizia, si prega di mostrare la carta verde \"WECO\" sul lato del corridoio, che si trova all\'interno della porta d\'ingresso. In tal caso, non puliremo né entreremo nella camera.',
    officialHP: 'Sito web ufficiale',
    preparing: 'Le informazioni dettagliate sono in preparazione.',
  },
  th: {
    hotelName: '',
    hotelTitle: '',
    heroTitle: '',
    welcomeMessage: '',
    welcomeMessage2: '',
    restaurantCoupon: '',
    checkInOut: '',
    bath: '',
    breakfast: '',
    dinner: '',
    service: '',
    wifi: '',
    lighting: '',
    longstay: '',
    lost: '',
    quickCheckin: '',
    dinnerTab: '',
    serviceTab: '',
    close: '',
    checkIn: '',
    checkOut: '',
    planNote: '',
    bathTitle: '',
    bathDescription: '',
    operatingHours: '',
    bathHours: '',
    saunaNote: '',
    notice: '',
    bathNotice1: '',
    bathNotice2: '',
    freeService: '',
    bathServiceDesc: '',
    breakfastTitle: '(1F)',
    breakfastPrice: '/ 2,300',
    breakfastHours: '6:15~9:30 (9:00)',
    breakfastNote1: '',
    breakfastNote2: '',
    serviceTitle: '',
    vendingMachine: '',
    alcoholNote: '',
    microwave: '',
    iceMaker: '',
    smoking: '',
    trouserPress: '',
    trouserPressLocation: '',
    laundry: '',
    laundryNote: '',
    wifiTitle: '',
    password: '',
    lostTitle: '',
    lostText1: '',
    lostText2: '',
    lostText3: '',
    lightingTitle: '',
    lightingDesc: '',
    lightingNote: '',
    longstayTitle: '',
    sheetExchange: '',
    noCleaning: '',
    officialHP: '',
    preparing: '',
  },
  'zh-TW': {
    hotelName: '',
    hotelTitle: '',
    heroTitle: '',
    welcomeMessage: '',
    welcomeMessage2: '',
    restaurantCoupon: '',
    checkInOut: '',
    bath: '',
    breakfast: '',
    dinner: '',
    service: '',
    wifi: '',
    lighting: '',
    longstay: '',
    lost: '',
    quickCheckin: '',
    dinnerTab: '',
    serviceTab: '',
    close: '',
    checkIn: '',
    checkOut: '',
    planNote: '',
    bathTitle: '',
    bathDescription: '',
    operatingHours: '',
    bathHours: '',
    saunaNote: '',
    notice: '',
    bathNotice1: '',
    bathNotice2: '',
    freeService: '',
    bathServiceDesc: '',
    breakfastTitle: '(1F)',
    breakfastPrice: '/ 2,300',
    breakfastHours: '6:15~9:30 (9:00)',
    breakfastNote1: '',
    breakfastNote2: '',
    serviceTitle: '',
    vendingMachine: '',
    alcoholNote: '(酒精飲料: 5F, 9F)',
    microwave: '微波爐',
    iceMaker: '製冰機',
    smoking: '吸煙區',
    trouserPress: '褲子壓燙機',
    trouserPressLocation: '各層電梯前',
    laundry: '洗衣角',
    laundryNote: '※洗滌劑、洗衣機/免費、烘乾機/付費(30分鐘¥100)',
    wifiTitle: 'Wi-Fi',
    password: '密碼:',
    lostTitle: '遺失物品',
    lostText1: '原則上，酒店不會就遺失物品與您聯繫。',
    lostText2: '如果沒有聯繫，物品將在3個月後根據遺失物品法處理。',
    lostText3: '但是，食品和飲料將在同一天處理。',
    lightingTitle: '室內照明',
    lightingDesc: '進入房間後，將房間鑰匙扣插入入口旁邊的電源插座以打開房間照明。',
    lightingNote: '※將鑰匙插入電源插座。',
    longstayTitle: '長期住宿客人',
    sheetExchange: '希望更換床單、被套和枕套的客人，請在床上展示「WECO卡」。如果未展示卡片，我們不會更換。(我們會更換毛巾和房間衣物。)',
    noCleaning: '不需要清潔的客人，請在走廊側展示位於入口門內側的綠色「WECO」卡。在這種情況下，我們不會清潔或進入房間。',
    officialHP: '官方網站',
    preparing: '詳細信息正在準備中。',
  },
};

export default function Home() {
  const { language: selectedLanguage, setLanguage: setSelectedLanguage } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showOtherLanguages, setShowOtherLanguages] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [breakfastImageIndex, setBreakfastImageIndex] = useState(0);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const [visibleServices, setVisibleServices] = useState<Set<string>>(new Set());

  const heroImages = [
    '/title-picture/top_main_img01.jpg',
    '/title-picture/top_main_img02.jpg',
    '/title-picture/top_main_img03.jpg',
    '/title-picture/top_main_img04.jpg',
    '/title-picture/top_main_img05.jpg',
    '/title-picture/top_main_img06.jpg',
    '/title-picture/top_main_img07.jpg',
  ];

  const breakfastImages = [
    '/morning-picture/breakfast003.jpg',
    '/morning-picture/breakfast004.jpg',
    '/morning-picture/breakfast005.jpg',
    '/morning-picture/breakfast006.jpg',
    '/morning-picture/breakfast007.jpg',
    '/morning-picture/breakfast008.jpg',
    '/morning-picture/breakfast012.jpg',
    '/morning-picture/breakfast013.jpg',
  ];

  const t = translations[selectedLanguage as keyof typeof translations] || translations['en'];

  // 画像のスライドショー（4秒ごとに切り替え）
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (selectedService !== 'breakfast') return;

    const interval = setInterval(() => {
      setBreakfastImageIndex((prevIndex) => (prevIndex + 1) % breakfastImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedService, breakfastImages.length]);

  // サービスアイコンのスクロールアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const serviceId = entry.target.getAttribute('data-service-id');
            if (serviceId) {
              setVisibleServices((prev) => new Set(prev).add(serviceId));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const serviceElements = servicesGridRef.current?.querySelectorAll('[data-service-id]');
    serviceElements?.forEach((el) => observer.observe(el));

    return () => {
      serviceElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // ドロップダウン外をクリックした時に閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showOtherLanguages &&
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowOtherLanguages(false);
      }
    };

    if (showOtherLanguages) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOtherLanguages]);

  const services = [
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/icon-matome/icon-carry.svg"
            alt={t.checkInOut}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'checkInOut' as const,
      id: 'checkin',
      textColor: 'text-[#A387]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/icon-matome/icon-bath.svg"
            alt={t.bath}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'bath' as const,
      id: 'bath',
      textColor: 'text-[#A387]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/icon-matome/icon-food.svg"
            alt={t.breakfast}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'breakfast' as const,
      id: 'breakfast',
      textColor: 'text-[#A387]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/icon-matome/icon-beer.svg"
            alt={t.dinner}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'dinner' as const,
      id: 'dinner', 
      highlighted: true,
      textColor: 'text-white'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/icon-matome/icon-washmachine.svg"
            alt={t.service}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'service' as const,
      id: 'service',
      textColor: 'text-[#A387]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/icon-matome/icon-Wifi.svg"
            alt={t.wifi}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'wifi' as const,
      id: 'wifi',
      textColor: 'text-[#A387]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/icon-matome/icon-light.svg"
            alt={t.lighting}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'lighting' as const,
      id: 'lighting',
      textColor: 'text-[#A387]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src={encodeURI('/icon-matome/icon-bed (1).svg')}
            alt={t.longstay}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'longstay' as const,
      id: 'longstay',
      textColor: 'text-[#A387]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/icon-matome/icon-tool.svg"
            alt={t.lost}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'lost' as const,
      id: 'lost',
      textColor: 'text-[#A387]'
    },
  ];

  const mainLanguages = [
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'zh', flag: '🇨🇳', label: '中文' },
    { code: 'zh-TW', flag: '🇹🇼', label: '繁體中文' },
    { code: 'ko', flag: '🇰🇷', label: '한국어' },
    { code: 'ja', flag: '🇯🇵', label: '日本語' },
  ];

  const otherLanguages = [
    { code: 'th', flag: '🇹🇭', label: 'ไทย' },
    { code: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
    { code: 'tl', flag: '🇵🇭', label: 'Tagalog' },
    { code: 'id', flag: '🇮🇩', label: 'Bahasa Indonesia' },
    { code: 'ms', flag: '🇲🇾', label: 'Bahasa Melayu' },
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'it', flag: '🇮🇹', label: 'Italiano' },
    { code: 'pt', flag: '🇵🇹', label: 'Português' },
  ];

return (
  <div className="min-h-screen bg-[#f9f2d4]">
    {/* ヘッダー */}
    <header className="bg-white/98 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 sm:py-0">
          {/* 左側：ロゴとホテル名 */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0 flex-1 sm:flex-none sm:max-w-none">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0">
              <Image
                src={encodeURI('/スクリーンショット 2026-02-06 1.21.09.png')}
                alt="GH"
                fill
                className="object-contain"
                sizes="64px"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <h1 className="sr-only">
                {t.hotelName} {t.hotelTitle}
              </h1>
              <div className="relative h-7 w-[240px] sm:h-8 sm:w-[280px] md:h-10 md:w-[360px]">
                <Image
                  src={encodeURI('/スクリーンショット 2026-02-06 1.21.18.png')}
                  alt={`${t.hotelName} ${t.hotelTitle}`}
                  fill
                  className="object-contain object-left"
                  sizes="(min-width: 768px) 360px, (min-width: 640px) 280px, 240px"
                  unoptimized
                />
              </div>
            </div>
          </div>

            {/* 右側：言語選択と飲食店クーポンボタン */}
            <div className="flex items-center justify-end shrink-0 space-x-0.5 sm:space-x-1 md:space-x-2 lg:space-x-3 flex-nowrap w-full sm:w-auto">
              {/* 言語選択 */}
              <div ref={languageDropdownRef} className="flex items-center space-x-0 sm:space-x-0.5 md:space-x-1 relative flex-nowrap shrink-0">
                {/* Another Language ボタン */}
                <button
                  onClick={() => setShowOtherLanguages(!showOtherLanguages)}
                  className={`flex flex-col items-center p-0.5 sm:p-1 md:p-1.5 rounded transition-colors ${
                    showOtherLanguages
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  title="Other Languages"
                >
                  <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-base sm:text-lg md:text-2xl leading-none">🌐</span>
                  <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-700 leading-tight mt-0.5">Another</span>
                </button>

                {/* 他の言語ドロップダウン */}
                {showOtherLanguages && (
                  <div 
                    className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 max-h-[60vh] sm:max-h-[300px] overflow-y-auto w-[calc(100vw-1rem)] sm:w-auto max-w-[calc(100vw-1rem)] sm:max-w-none"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {otherLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code as LanguageCode);
                            setShowOtherLanguages(false);
                          }}
                          className={`flex flex-col items-center p-1.5 sm:p-2 rounded transition-colors ${
                            selectedLanguage === lang.code
                              ? 'bg-blue-50'
                              : 'hover:bg-gray-50'
                          }`}
                          title={lang.label}
                        >
                          <span className="text-base sm:text-lg md:text-2xl leading-none mb-1">{lang.flag}</span>
                          <span className="text-[10px] sm:text-xs text-gray-700 leading-tight text-center">{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 基本4言語 */}
                {mainLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code as LanguageCode);
                      setShowOtherLanguages(false);
                    }}
                    className={`flex flex-col items-center p-0.5 sm:p-1 md:p-1.5 rounded transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    title={lang.label}
                  >
                    <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-base sm:text-lg md:text-2xl leading-none">{lang.flag}</span>
                    <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-700 leading-tight mt-0.5">{lang.label}</span>
                  </button>
                ))}
              </div>

              {/* 飲食店クーポンボタン（内部ページ） */}
              <Link
                href="/coupon"
                className="bg-red-500 hover:bg-red-600 text-white px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 rounded-md text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold transition-colors whitespace-nowrap shadow-sm inline-block"
              >
                {t.restaurantCoupon}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative bg-gray-900">
        <div className="relative h-96 sm:h-[500px] overflow-hidden">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt="HOTEL ドーミーイン Dormy inn"
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                unoptimized
              />
            </div>
          ))}
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <div className="text-center p-8 sm:p-12">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                {t.heroTitle}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ウェルカムメッセージ */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {t.welcomeMessage}
            <br className="hidden sm:block" />
            {t.welcomeMessage2}
          </p>
        </div>
      </section>

      {/* サービスグリッド */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesGridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {services.map((service, index) => (
              service.id === 'dinner' ? (
                <Link
                  key={service.id}
                  data-service-id={service.id}
                  href="/coupon"
                  className={`p-3 sm:p-4 md:p-6 rounded-lg transition-all duration-700 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    backgroundColor: '#A3879D',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 15px 15px -5px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-center leading-tight text-white wrap-break-word px-1">
                    {t[service.titleKey]}
                  </div>
                </Link>
              ) : service.id === 'lighting' ? (
                <button
                  key={service.id}
                  data-service-id={service.id}
                  onClick={() => {
                    if (service.id === 'breakfast') {
                      setBreakfastImageIndex(0);
                    }
                    setSelectedService(service.id);
                  }}
                  className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-700 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold text-center leading-tight wrap-break-word px-1 ${service.textColor || 'text-blue-800'}`}>
                    {t[service.titleKey]}
                  </div>
                </button>
              ) : service.id === 'bath' ? (
                <button
                  key={service.id}
                  data-service-id={service.id}
                  onClick={() => {
                    if (service.id === 'breakfast') {
                      setBreakfastImageIndex(0);
                    }
                    setSelectedService(service.id);
                  }}
                  className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-700 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold text-center leading-tight wrap-break-word px-1 ${service.textColor || 'text-blue-800'}`}>
                    {t[service.titleKey]}
                  </div>
                </button>
              ) : (
                <button
                  key={service.id}
                  data-service-id={service.id}
                  onClick={() => {
                    if (service.id === 'breakfast') {
                      setBreakfastImageIndex(0);
                    }
                    setSelectedService(service.id);
                  }}
                  className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-700 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold text-center leading-tight wrap-break-word px-1 ${service.textColor || 'text-blue-800'}`}>
                    {t[service.titleKey]}
                  </div>
                </button>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ウェルカムメッセージ */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {t.welcomeMessage}
            <br className="hidden sm:block" />
            {t.welcomeMessage2}
          </p>
        </div>
      </section>

      {/* モーダルダイアログ */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-4 sm:p-6 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedService === 'checkin' && (
              <>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t.checkInOut}</h3>
                <div className="space-y-3 mb-4">
                  <div className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">{t.checkIn}</span> 15:00〜
                  </div>
                  <div className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">{t.checkOut}</span> 〜11:00
                  </div>
                  <div className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">BBH会員</span> 13:00〜 / 〜12:00
                  </div>
                  <div className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">アーリーチェックイン</span> 1時間につき1,000円（最大14:00まで）
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {t.planNote}
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'bath' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.bathTitle}</h3>
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="space-y-1 text-gray-700 leading-relaxed">
                    <p>ヨーロピアン・アンティークの調度品が優雅なロビー。</p>
                    <p>都会の謙遜を忘れる落ち着いた空間です。</p>
                    <p>「スターバックス コーヒー」へはロビーから直接お入りいただけます。</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative w-full h-64">
                      <Image
                        src="/facility001.jpg"
                        alt={t.bathTitle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative w-full h-64">
                      <Image
                        src="/facility002.jpg"
                        alt={t.bathTitle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'breakfast' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {t.breakfastTitle}
                </h3>
                
                {/* 朝食セクション */}
                <div className="mb-6">
                  {selectedLanguage === 'ja' ? (
                    <div className="space-y-4 mb-4">
                      <div className="text-gray-700">
                        {t.breakfastPrice}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">朝食会場</div>
                        <div className="text-gray-700">10階</div>
                      </div>
                      <div className="text-gray-700">
                        <span className="font-semibold">営業時間</span> 6:45～9:00（最終入場8:45）
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{t.breakfastPrice}</h4>
                      <div className="space-y-2 mb-4">
                        <div className="text-gray-700">
                          <span className="font-semibold">{t.operatingHours}</span> {t.breakfastHours}
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>{t.breakfastNote1}</li>
                          <li>{t.breakfastNote2}</li>
                        </ul>
                      </div>
                    </>
                  )}
                  {/* 朝食の画像 */}
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <div className="relative w-full h-64">
                      <Image
                        src={breakfastImages[breakfastImageIndex]}
                        alt={selectedLanguage === 'ja' ? '朝食' : selectedLanguage === 'en' ? 'Breakfast' : selectedLanguage === 'zh' ? '早餐' : selectedLanguage === 'ko' ? '조식' : 'Breakfast'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        unoptimized
                      />

                      <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={() =>
                          setBreakfastImageIndex(
                            (prevIndex) =>
                              (prevIndex - 1 + breakfastImages.length) % breakfastImages.length
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        <span className="text-2xl leading-none">‹</span>
                      </button>

                      <button
                        type="button"
                        aria-label="Next photo"
                        onClick={() =>
                          setBreakfastImageIndex(
                            (prevIndex) => (prevIndex + 1) % breakfastImages.length
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        <span className="text-2xl leading-none">›</span>
                      </button>
                    </div>
                  </div>
                  {selectedLanguage === 'ja' ? (
                    <div className="space-y-2 text-gray-700">
                      <p>地元の食材を活かした、栄養満点の朝食バイキングをお召し上がりいただけます。</p>
                      <p className="text-sm text-gray-600">営業時間は予告なく変更となる場合もございます。</p>
                    </div>
                  ) : null}
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'service' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.serviceTitle}</h3>
                <div className="border-t border-gray-200 pt-4">
                  <ul className="space-y-3 text-gray-700">
                    <li>
                      <span className="font-semibold">{t.vendingMachine}</span>: 5・7・9F
                      <span className="text-sm text-gray-600 ml-2">{t.alcoholNote}</span>
                    </li>
                    <li>
                      <span className="font-semibold">{t.microwave}</span>: 10F
                    </li>
                    <li>
                      <span className="font-semibold">{t.iceMaker}</span>: 7・9F
                    </li>
                    <li>
                      <span className="font-semibold">{t.smoking}</span>: 9F
                    </li>
                    <li>
                      <span className="font-semibold">{t.trouserPress}</span>: {t.trouserPressLocation}
                    </li>
                    <li>
                      <span className="font-semibold">{t.laundry}</span>: 5F
                      <p className="text-sm text-gray-600 mt-1 ml-4">
                        {t.laundryNote}
                      </p>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'wifi' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.wifiTitle}</h3>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-700 mb-4">
                    アクセスポイントはお部屋に設置の「客室インターネットのご案内」をご覧くださいませ。
                  </p>
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 inline-flex items-center">
                    <span className="font-bold text-gray-900">{t.password}</span>
                    <span className="font-bold text-red-700 ml-2">hgts7755</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'lost' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.lostTitle}</h3>
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>
                      {t.lostText1}
                    </p>
                    <p>
                      {t.lostText2}
                    </p>
                    <p>
                      {t.lostText3}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'lighting' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.lightingTitle}</h3>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {t.lightingDesc}
                  </p>
                  
                  {/* 図解の画像 */}
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <div className="relative w-full h-auto">
                      <Image
                        src="/key.png"
                        alt={t.lightingTitle}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 text-center">
                    {t.lightingNote}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'longstay' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.longstayTitle}</h3>
                
                {/* シーツ交換について */}
                <div className="mb-6">
                  <div className="mb-4 rounded-lg overflow-hidden flex justify-center">
                    <div className="relative w-64 h-auto max-w-full">
                      <Image
                        src="/shirts.png"
                        alt={selectedLanguage === 'ja' ? 'シーツ交換用WECOカード' : selectedLanguage === 'en' ? 'WECO Card for Sheet Exchange' : selectedLanguage === 'zh' ? '床单更换用WECO卡' : selectedLanguage === 'ko' ? '시트 교체용 WECO 카드' : 'WECO Card for Sheet Exchange'}
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t.sheetExchange}
                  </p>
                </div>

                {/* 清掃不要について */}
                <div className="mb-6">
                  <div className="mb-4 rounded-lg overflow-hidden flex justify-center">
                    <div className="relative w-64 h-auto max-w-full">
                      <Image
                        src="/room-clean.png"
                        alt={selectedLanguage === 'ja' ? '清掃不要用WECOカード' : selectedLanguage === 'en' ? 'WECO Card for No Cleaning' : selectedLanguage === 'zh' ? '不需要清洁用WECO卡' : selectedLanguage === 'ko' ? '청소 불필요용 WECO 카드' : 'WECO Card for No Cleaning'}
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t.noCleaning}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService !== 'checkin' && selectedService !== 'bath' && selectedService !== 'breakfast' && selectedService !== 'service' && selectedService !== 'wifi' && selectedService !== 'lost' && selectedService !== 'lighting' && selectedService !== 'longstay' && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {services.find(s => s.id === selectedService) ? t[services.find(s => s.id === selectedService)!.titleKey] : ''}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t.preparing}
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* 左側：ホテル情報 */}
            <div className="md:col-span-2 flex flex-col items-center text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {t.hotelName ? (
                  <>
                    {t.hotelName}<br />{t.hotelTitle}
                  </>
                ) : (
                  <>{t.hotelTitle}</>
                )}
              </h3>
              <div className="space-y-2 text-sm text-gray-700 mb-6">
                <p>〒980-0803<br />{selectedLanguage === 'ja' ? '宮城県仙台市青葉区国分町2-2-2' : selectedLanguage === 'en' ? '2-2-2 Kokubuncho, Aoba-ku, Sendai, Miyagi 980-0803' : selectedLanguage === 'zh' ? '宫城县仙台市青叶区国分町2-2-2' : '미야기현 센다이시 아오바구 고쿠분초 2-2-2'}</p>
                <p>TEL 022-262-7755</p>
              </div>
              <div className="mt-6">
                <Link
                  href="https://breezbay-group.com/hgt-s-kokubuncho/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center space-y-2 hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-20 h-20">
                    <Image
                      src={encodeURI('/スクリーンショット 2026-02-06 1.21.09.png')}
                      alt={selectedLanguage === 'ja' ? '鳥のキャラクター' : selectedLanguage === 'en' ? 'Bird Character' : selectedLanguage === 'zh' ? '鸟角色' : selectedLanguage === 'ko' ? '새 캐릭터' : 'Bird Character'}
                      fill
                      className="object-contain"
                      sizes="80px"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{t.officialHP}</span>
                </Link>
              </div>
            </div>

            {/* 右側：Googleマップ */}
            <div className="md:col-span-3">
              <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent('宮城県仙台市青葉区国分町2-2-2 ホテルグランテラス仙台国分町')}&output=embed&hl=ja&z=17`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="ホテルグランテラス仙台国分町"
                ></iframe>
              </div>
            </div>
          </div>

          {/* コピーライト */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-xs text-gray-500">
              © kyoritsugroup.co.jp All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
