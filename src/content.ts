// Bilingual copy for the whole site (Traditional Chinese + English).
export type Bi = { zh: string; en: string };

export const content = {
  meta: {
    title: "Colbert & Crystal's Wedding",
  },

  cover: {
    topLine: { zh: '永結同心', en: 'Forever United' } as Bi,
    passportLabel: { zh: '婚禮護照', en: 'PASSPORT' } as Bi,
    title: "Colbert & Crystal's Wedding",
    openButton: { zh: '打開', en: 'Open' } as Bi,
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
      time: { zh: '16:00 後（時間待定）', en: 'From 4:00 PM (time TBD)' } as Bi,
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
    guestCount: { zh: '出席人數', en: 'Number of Guests' } as Bi,
    attending: { zh: '參加活動', en: 'Attending' } as Bi,
    attendingHint: {
      zh: '可複選，兩個活動都能參加',
      en: 'Select all that apply — you’re welcome to join both',
    } as Bi,
    attendWedding: { zh: '婚禮', en: 'Wedding Ceremony' } as Bi,
    attendAfterParty: { zh: 'After Party', en: 'After Party' } as Bi,
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
