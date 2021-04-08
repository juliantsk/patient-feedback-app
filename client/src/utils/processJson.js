export const processPatientData = (obj) => {
    const result = {
        name: "",
        doctorLastName: "",
        diagnosis: "",
        appointment: {
            text: "",
            date: "",
        },
    };
    for (const data of obj.entry) {
        switch (data.resource.resourceType) {
            case "Patient":
                result.name = data.resource.name[0]?.given[0];
                break;
            case "Doctor":
                result.doctorLastName = data.resource.name[0]?.family;
                break;
            case "Appointment":
                result.appointment.text = data.resource.type[0].text;
                result.appointment.date = data.resource.period.start.split(
                    "T"
                )[0];
                break;
            case "Diagnosis":
                result.diagnosis = data.resource.code.coding[0].name;
                break;
            default:
                break;
        }
    }
    return result;
};

export const processQuestionList = (patientData, response) => {
    const result = response.entry[0].resource.questionList;
    const replaceList = [
        ["[Patient First Name]", patientData.name],
        ["[Doctor Last Name]", patientData.doctorLastName],
        ["[Diagnosis]", patientData.diagnosis],
    ];

    result.forEach(
        (item) =>
            (item.text = item.text
                .replace(...replaceList[0])
                .replace(...replaceList[1])
                .replace(...replaceList[2]))
    );

    return result;
};

const processJson = { processPatientData, processQuestionList };
export default processJson;
