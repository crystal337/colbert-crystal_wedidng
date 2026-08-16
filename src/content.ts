// Bilingual copy for the whole site (Traditional Chinese + English).
export type Bi = { zh: string; en: string };

export const content = {
  meta: {
    title: "Colbert & Crystal's Wedding",
  },

  // The cover is always shown in English, regardless of the language toggle.
  cover: {
    passportWord: 'PASSPORT',
    line: 'Marriage of Crystal & Colbert',
    date: 'Jan 2027',
    openButton: 'Open',
  },

  // The inner "passport" story pages (image + caption). Follow the toggle.
  story: [
    { zh: '我們因留港讀書相識、相知', en: 'We met and grew close while studying in Hong Kong' } as Bi,
    { zh: '在不斷的遠距離中相守', en: 'Through years of long distance, we stayed devoted to each other' } as Bi,
    { zh: '從澳洲', en: 'From Australia' } as Bi,
    { zh: '到新加坡，再回到香港', en: 'to Singapore, and back to Hong Kong' } as Bi,
    { zh: '如今，我們要結婚啦！', en: 'And now — we’re getting married!' } as Bi,
  ] as Bi[],

  // The closing invitation, shown on the passport's back cover. Each entry is
  // its own paragraph (separated by a blank line).
  invite: [
    {
      zh: '謝謝你/妳曾參與我們的生命，我們滿心期待地邀請你一起見證我們的婚姻。',
      en: 'Thank you for being part of our lives. With full hearts, we invite you to witness our marriage.',
    } as Bi,
    {
      zh: '請告訴我們，你希望帶著這本護照，參與哪一段旅程呢？',
      en: 'Please tell us which part of the journey you’d like to join us for with this passport.',
    } as Bi,
  ] as Bi[],

  langToggle: {
    // label shown on the switcher for the language you'd switch TO
    toZh: '中文',
    toEn: 'EN',
  },

  flipbook: {
    next: { zh: '下一頁 ›', en: 'Next ›' } as Bi,
    toForm: { zh: '填寫回覆 ›', en: 'RSVP ›' } as Bi,
    backToPassport: { zh: '‹ 回到護照', en: '‹ Back to passport' } as Bi,
  },

  eventsHeading: { zh: '活動資訊', en: 'Event Details' } as Bi,

  eventFields: {
    date: { zh: '日期', en: 'Date' } as Bi,
    time: { zh: '登機時間', en: 'Boarding Time' } as Bi,
    venue: { zh: '登機閘口', en: 'Boarding Gate' } as Bi,
  },

  stamps: {
    met: { zh: '相識', en: 'Where We Met' } as Bi,
    together: { zh: '相守', en: 'Together Forever' } as Bi,
  },

  intro: {
    paragraph: {
      zh: '謝謝你參與了我們的人生，並準備和我們共同慶祝這段旅程的開始。以下請告訴我們，你將帶著這本護照，參與哪一段旅程。',
      en: 'Thank you for being part of our lives, and for celebrating the start of our journey together. Please let us know below which part of the journey you’ll be joining us for.',
    } as Bi,
  },

  events: {
    wedding: {
      badge: { zh: '主要目的地', en: 'Main Destination' } as Bi,
      name: { zh: "Colbert & Crystal's 婚禮午宴", en: "Colbert & Crystal's Wedding Luncheon" } as Bi,
      location: { zh: '高雄洲際酒店 芳苑廳', en: 'InterContinental Kaohsiung, Fang Yuan Hall' } as Bi,
      date: { zh: '2027 年 1 月 23 日（六）', en: 'Saturday, Jan 23, 2027' } as Bi,
      time: { zh: '11:30', en: '11:30 AM' } as Bi,
    },
    afterParty: {
      badge: { zh: '連接航班（可選）', en: 'Connected Flight (Optional)' } as Bi,
      name: { zh: '{宴後小聚} 愛河邊的微醺時光', en: '{After-Party} Tipsy Hours by the Love River' } as Bi,
      location: { zh: '地點待訂', en: 'Venue TBD' } as Bi,
      date: { zh: '2027 年 1 月 23 日（六）', en: 'Saturday, Jan 23, 2027' } as Bi,
      time: { zh: '17:00（待訂）', en: '5:00 PM (TBD)' } as Bi,
      description: {
        zh: '婚禮後，如果你有興致留下來，也希望邀請你們與我們一起聊聊天，在河邊放鬆一下。',
        en: 'After the wedding, if you feel like staying, we’d love for you to hang out, chat, and unwind with us by the river.',
      } as Bi,
    },
  },

  form: {
    heading: { zh: '賓客回覆', en: 'RSVP' } as Bi,
    deadline: { zh: '請於 8 月 31 日前回覆', en: 'Please reply by August 31' } as Bi,
    name: { zh: '姓名', en: 'Name' } as Bi,
    namePlaceholder: { zh: '請輸入你的姓名', en: 'Your name' } as Bi,

    email: { zh: '電郵', en: 'Email' } as Bi,
    emailPlaceholder: { zh: '請輸入電子郵件', en: 'Your email' } as Bi,

    relationship: { zh: '與新人關係', en: 'Relationship to the Couple' } as Bi,
    relGroomRelative: { zh: '男方親戚', en: "Groom's Relative" } as Bi,
    relBrideRelative: { zh: '女方親戚', en: "Bride's Relative" } as Bi,
    relGroomFriend: { zh: '男方朋友', en: "Groom's Friend" } as Bi,
    relBrideFriend: { zh: '女方朋友', en: "Bride's Friend" } as Bi,
    relBothFriend: { zh: '男女雙方朋友', en: "Friend of Both" } as Bi,
    relOther: { zh: '其他', en: 'Other' } as Bi,
    relOtherPlaceholder: { zh: '請說明與新人的關係', en: 'Describe your relationship' } as Bi,
    relationshipHint: { zh: '可複選', en: 'Select all that apply' } as Bi,

    guestCount: { zh: '乘客人數', en: 'Number of Passengers' } as Bi,
    companions: { zh: '同行賓客', en: 'Accompanying Guests' } as Bi,
    companionsHint: {
      zh: '選填',
      en: 'Optional',
    } as Bi,
    companionPlaceholder: { zh: '同行賓客', en: 'Guest' } as Bi,

    attending: { zh: '參加活動', en: 'Attending' } as Bi,
    attendingHint: {
      zh: '可複選，兩個活動都能參加',
      en: 'Select all that apply — you’re welcome to join both',
    } as Bi,
    attendWedding: { zh: '婚禮午宴', en: 'Wedding Luncheon' } as Bi,
    attendAfterParty: { zh: '宴後小聚', en: 'After-Party' } as Bi,

    childChair: { zh: '是否需要兒童椅', en: 'Need a High Chair?' } as Bi,
    childChairYes: { zh: '是', en: 'Yes' } as Bi,
    childChairNo: { zh: '否', en: 'No' } as Bi,
    childChairOther: { zh: '其他', en: 'Other' } as Bi,
    childChairOtherPlaceholder: { zh: '請說明', en: 'Please specify' } as Bi,

    vegetarianCount: { zh: '素食人數', en: 'Number of Vegetarians' } as Bi,

    photo: { zh: '上傳照片', en: 'Upload a Photo' } as Bi,
    photoHint: {
      zh: '歡迎留下一張我們的合照給我們（可能會用在婚禮上喔～）',
      en: 'Feel free to leave us a photo of us together (it might be used at the wedding~)',
    } as Bi,
    photoChoose: { zh: '選擇照片', en: 'Choose Photo' } as Bi,
    photoChange: { zh: '更換照片', en: 'Change Photo' } as Bi,
    photoDropHint: { zh: '點擊選擇，或將照片拖曳到這裡', en: 'Click to choose, or drag a photo here' } as Bi,
    submit: { zh: '送出', en: 'Submit' } as Bi,
    submitting: { zh: '送出中…', en: 'Submitting…' } as Bi,
    errorRequired: { zh: '請填寫姓名並選擇至少一項活動', en: 'Please enter your name and select at least one event' } as Bi,
    errorGeneric: {
      zh: '送出時發生錯誤，請稍後再試一次。',
      en: 'Something went wrong while submitting. Please try again.',
    } as Bi,
  },

  // Digital "boarding pass" shown after the form is submitted.
  // Field labels are kept in English for an authentic ticket look; the
  // editable values below are what you'd tweak (codes, gate, time…).
  boardingPass: {
    title: 'BOARDING PASS',
    subtitle: { zh: '婚禮登機證', en: 'Wedding Boarding Pass' } as Bi,
    fromCode: 'TPE',
    fromCity: { zh: '台北', en: 'Taipei' } as Bi,
    toCode: 'WED',
    toCity: { zh: '婚禮', en: 'The Wedding' } as Bi,
    flight: 'CC 0123',
    date: '23 JAN 2027',
    boardingTime: '11:30',
    gate: { zh: '宴會廳', en: 'Ballroom' } as Bi,
    seat: { zh: '自由入座', en: 'Open Seating' } as Bi,
    passengerLabel: 'PASSENGER',
    fallbackName: { zh: '貴賓', en: 'Guest' } as Bi,
    note: { zh: '謝謝你加入我們的旅程', en: 'Thank you for joining our journey' } as Bi,
    shareHint: { zh: '截圖，分享你的登機證 ✈', en: 'Screenshot & share your boarding pass ✈' } as Bi,
    labels: {
      from: 'FROM',
      to: 'TO',
      flight: 'FLIGHT',
      date: 'DATE',
      boarding: 'BOARDING',
      gate: 'GATE',
      seat: 'SEAT',
    },
  },

  thankYou: {
    heading: { zh: '謝謝你的回覆！', en: 'Thank You!' } as Bi,
    paragraph: {
      zh: '活動的後續資訊，我們將透過以下方式通知大家，請選擇適合你的方式，點擊連結即可加入群組。',
      en: 'We’ll share event updates through the group below — pick whichever works for you and tap to join.',
    } as Bi,
    line: { zh: '加入 LINE 群組', en: 'Join on LINE' } as Bi,
    whatsapp: { zh: '加入 WhatsApp 群組', en: 'Join on WhatsApp' } as Bi,
    calendar: { zh: '加入 Google 日曆', en: 'Add to Google Calendar' } as Bi,
    appleCalendar: { zh: '加入 Apple 行事曆', en: 'Add to Apple Calendar' } as Bi,
  },
};
