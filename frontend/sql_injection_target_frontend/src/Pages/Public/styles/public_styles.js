import * as applicationStyles from '../../../application_styles'

export const containerStyle = {
    width: '25%',
    height: '55%',
    marginTop: '5%',
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'steelblue',
    borderRadius: '25px',
    padding: '45px',
    backgroundColor: '#4357d0'
}

export const registerContainerStyle = { ...containerStyle, width: "40%" }

export const addButton = { ...applicationStyles.addButton }

export const headingStyle = { textAlign: 'center', color: 'white' }

export const loginButtonStyle = { backgroundColor: '#57d043', color: "white", width: "100%" }

export const registerButtonStyle = { backgroundColor: '#f5c518', color: "white", width: '100%', marginTop: "10px" }

export const inputFieldLabelStyle = { color: "white" }

export const errorMessageStyle = { color: "orange" }