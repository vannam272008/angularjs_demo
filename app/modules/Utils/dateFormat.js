const formatDateToSubmit = (date) => {
    var newDate = new Date(date)
    return newDate.toLocaleDateString('en-GB').split('/').reverse().join('-');
};

const formatDateView = (date) => {
    return date.toLocaleDateString('en-GB');
};

const formatDateViewDetail = (dateString) => {
    const inputDate = new Date(dateString);
    const formattedDate = inputDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = inputDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${formattedDate} ${formattedTime}`;
}