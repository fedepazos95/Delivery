export const getDeliverySchema = () => {
  return {
    name: '',
    phone: '',
    description: '',
    specialties: '',
    direction: '',
    startTime: '',
    endTime: '',
    admName: '',
    admSurname: '',
    admPhone: '',
    admEmail: '',
    cmName: '',
    cmSurname: '',
    cmPhone: '',
    cmEmail: ''
  }
}

export const getValidDeliverySchema = () => {
  // If a field is required, it starts with false
  return {
    name: false,
    phone: false,
    description: false,
    specialties: true,
    direction: false,
    startTime: false,
    endTime: false,
    admName: false,
    admSurname: false,
    admPhone: false,
    admEmail: false,
    cmName: false,
    cmSurname: false,
    cmPhone: false,
    cmEmail: false
  }
}

export const getInputsRestrictions = () => {
  // It allows to set the char limits 
  return {
    name: 50,
    phone: 50,
    description: 1000,
    specialties: 500,
    direction: 200,
    startTime: 24,
    endTime: 24,
    admName: 200,
    admSurname: 200,
    admPhone: 100,
    admEmail: 100,
    cmName: 200,
    cmSurname: 200,
    cmPhone: 100,
    cmEmail: 100
  }
}
