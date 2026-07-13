// Bilingual copy for the whole site (Traditional Chinese + English).
export type Bi = { zh: string; en: string };

export const content = {
  meta: {
    title: "Colbert & Crystal's Wedding",
  },

  cover: {
    passportWord: { zh: '護照', en: 'PASSPORT' } as Bi,
    subtitle: { zh: '我們的婚禮旅程', en: 'the marriage…' } as Bi,
    names: 'Colbert & Crystal',
    date: { zh: '2027 年 1 月', en: 'Jan 2027' } as Bi,
    openButton: { zh: '打開', en: 'Open' } as Bi,
  },

  langToggle: {
    // label shown on the switcher for the language you'd switch TO
    toZh: '中文',
    toEn: 'EN',
  },

  eventFields: {
    date: { zh: '日期', en: 'Date' } as Bi,
    time: { zh: '時間', en: 'Time' } as Bi,
    venue: { zh: '地點', en: 'Venue' } as Bi,
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
      badge: { zh: '活動一', en: 'Event 01' } as Bi,
      name: { zh: '婚禮', en: 'Wedding Ceremony' } as Bi,
      location: { zh: '高雄洲際酒店', en: 'InterContinental Kaohsiung' } as Bi,
      date: { zh: '2027 年 1 月 23 日（六）', en: 'Saturday, Jan 23, 2027' } as Bi,
      time: { zh: '11:30', en: '11:30 AM' } as Bi,
    },
    afterParty: {
      badge: { zh: '活動二', en: 'Event 02' } as Bi,
      name: { zh: 'After Party', en: 'After Party' } as Bi,
      location: { zh: '地點待訂', en: 'Venue TBD' } as Bi,
      date: { zh: '2027 年 1 月 23 日（六）', en: 'Saturday, Jan 23, 2027' } as Bi,
      time: { zh: '17:00', en: '5:00 PM' } as Bi,
      description: {
        zh: '和大家多聚聚、聊聊天',
        en: 'A relaxed gathering to catch up and chat together',
      } as Bi,
    },
  },

  form: {
    heading: { zh: '賓客回覆', en: 'RSVP' } as Bi,
    name: { zh: '姓名', en: 'Name' } as Bi,
    namePlaceholder: { zh: '請輸入你的姓名', en: 'Your name' } as Bi,

    email: { zh: '電郵', en: 'Email' } as Bi,
    emailPlaceholder: { zh: '請輸入電子郵件', en: 'Your email' } as Bi,

    relationship: { zh: '與新人關係', en: 'Relationship to the Couple' } as Bi,
    relGroomRelative: { zh: '男方親戚', en: "Groom's Relative" } as Bi,
    relBrideRelative: { zh: '女方親戚', en: "Bride's Relative" } as Bi,
    relGroomFriend: { zh: '男方朋友', en: "Groom's Friend" } as Bi,
    relBrideFriend: { zh: '女方朋友', en: "Bride's Friend" } as Bi,

    guestCount: { zh: '出席人數', en: 'Number of Guests' } as Bi,
    companions: { zh: '同行賓客姓名', en: 'Accompanying Guests' } as Bi,
    companionsHint: {
      zh: '請填寫其他同行者的姓名',
      en: 'Names of the other guests joining you',
    } as Bi,
    companionPlaceholder: { zh: '姓名', en: 'Name' } as Bi,

    attending: { zh: '參加活動', en: 'Attending' } as Bi,
    attendingHint: {
      zh: '可複選，兩個活動都能參加',
      en: 'Select all that apply — you’re welcome to join both',
    } as Bi,
    attendWedding: { zh: '婚禮', en: 'Wedding Ceremony' } as Bi,
    attendAfterParty: { zh: 'After Party', en: 'After Party' } as Bi,

    childChair: { zh: '是否需要兒童椅', en: 'Need a High Chair?' } as Bi,
    childChairYes: { zh: '是', en: 'Yes' } as Bi,
    childChairNo: { zh: '否', en: 'No' } as Bi,
    childChairOther: { zh: '其他', en: 'Other' } as Bi,
    childChairOtherPlaceholder: { zh: '請說明', en: 'Please specify' } as Bi,

    vegetarianCount: { zh: '素食人數', en: 'Number of Vegetarians' } as Bi,

    photo: { zh: '上傳照片', en: 'Upload a Photo' } as Bi,
    photoHint: { zh: '選填，留下一張你的照片給我們', en: 'Optional — share a photo of yourself with us' } as Bi,
    photoChoose: { zh: '選擇照片', en: 'Choose Photo' } as Bi,
    photoChange: { zh: '更換照片', en: 'Change Photo' } as Bi,
    submit: { zh: '送出', en: 'Submit' } as Bi,
    submitting: { zh: '送出中…', en: 'Submitting…' } as Bi,
    errorRequired: { zh: '請填寫姓名並選擇至少一項活動', en: 'Please enter your name and select at least one event' } as Bi,
    errorGeneric: {
      zh: '送出時發生錯誤，請稍後再試一次。',
      en: 'Something went wrong while submitting. Please try again.',
    } as Bi,
  },

  thankYou: {
    heading: { zh: '謝謝你的回覆！', en: 'Thank You!' } as Bi,
    paragraph: {
      zh: '活動的後續資訊，我們將透過以下方式通知大家，請選擇適合你的方式，點擊連結即可加入群組。',
      en: 'We’ll share event updates through the group below — pick whichever works for you and tap to join.',
    } as Bi,
    line: { zh: '加入 LINE 群組', en: 'Join on LINE' } as Bi,
    whatsapp: { zh: '加入 WhatsApp 群組', en: 'Join on WhatsApp' } as Bi,
  },
};
