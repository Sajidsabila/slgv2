export const convertDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
};

export const getEnrollment = () => {
  try {
    const raw = sessionStorage.getItem("token");
    if (!raw) return [];

   let data; 
   data = typeof raw === "string" ? JSON.parse(raw) : raw;
   const enrollments = data?.program_enrollments;
    if (Array.isArray(enrollments)) {

      return enrollments.map((e) => ({
        program: e.program,
        course: e.course,
        class_format: e.class_format,
        class_grading: e.class_grading
      }));
    } else if(typeof enrollments === 'object' && enrollments !== null) {
      return [
        {
          program: enrollments.program,
          course: enrollments.course,
          class_format: enrollments.class_format,
          class_grading: enrollments.class_grading
        }
      ];
    }
    return [];
  } catch (error) {
    console.error("Gagal ambil program codes dari session:", error);
    return [];
  }
}

export const capitalAtWords = (string) => {
  if (typeof string !== 'string') return '';
  return string.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase());
}

export const currencyFormat = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}