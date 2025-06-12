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

    const data = JSON.parse(raw);
    const enrollments = data?.program_enrollment;

    if (Array.isArray(enrollments)) {
      // hanya ambil nilai `program` dari setiap item
      return enrollments.map((e) => e.program);
    }

    return [];
  } catch (error) {
    console.error("Gagal ambil program codes dari session:", error);
    return [];
  }
}
