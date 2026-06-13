export const calendarMethod = Object.freeze({
    HJCoSA: {
        value: 'HJCoSA',
        description: 'High Judicial Council of Saudi Arabia (this is used on aladhan.com)'
    },
    UAQ: {
        value: 'UAQ',
        description: 'Umm al-Qura'
    },
    DIYANET: {
        value: 'DIYANET',
        description: 'Diyanet İşleri Başkanlığı'
    },
    MATHEMATICAL: {
        value: 'MATHEMATICAL',
        description: ''
    }
})


export const latitudeAdjustmentMethod = Object.freeze({
    MiddleOfTheNight: {
        value: 1,
        description: 'Middle of the Night'
    },
    OneSeventh: {
        value: 2,
        description: 'One Seventh'
    },
    AngleBased: {
        value: 3,
        description: 'Angle Based'
    },
})


export const midnightMode = Object.freeze({
    Standard: {
        value: 0,
        description: 'Mid Sunset to Sunrise'
    },
    Jafari: {
        value: 1,
        description: 'Mid Sunset to Fajr'
    }
})

export const school = Object.freeze({
    Shafi: {
        value: 0,
        description: 'Shafi'
    },
    Hanafi: {
        value: 1,
        description: 'Hanafi'
    }
})

export const prayerCalculationMethod = Object.freeze({
    Jafari: {
        value: 0,
        description: 'Jafari / Shia Ithna-Ashari'
    },
    UIS: {
        value: 1,
        description: 'University of Islamic Sciences, Karachi'
    },
    ISNA: {
        value: 2,
        description: 'Islamic Society of North America'
    },
    MWL: {
        value: 3,
        description: 'Muslim World League'
    },
    UAQU: {
        value: 4,
        description: 'Umm Al-Qura University, Makkah'
    },
    Egypte: {
        value: 5,
        description: 'Egyptian General Authority of Survey'
    },
    Morocco: {
        value: 21,
        description: 'Morocco'
    }
})