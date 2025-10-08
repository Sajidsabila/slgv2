import { FloatButton, notification, Spin } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { postIssue, getIssueTypeList, apiSendWa } from "../api/apiSendIssue";



const FloatingChatButton = () => {
  const [modal, setIsModal] = useState(false);
  const [issueType, setIssueType] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    mobile_no: "",
    issue_type: "",
    description: "",
    subject: "",
  });

  const [loading, setIsLoading] = useState(false);
  const recaptchaRef = useRef(null);

  const showModal = () => setIsModal(true);
  const closeModal = () =>{
    setIsModal(false);
    setFormData({});
  } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subject, nama, mobile_no, issue_type, description } = formData;

    if (!subject || !nama || !mobile_no || !issue_type || !description) {
      alert("Form tidak boleh kosong!");
      return;
    }

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      alert("Silakan verifikasi bahwa Anda bukan robot.");
      return;
    }

    setIsLoading(true);
    closeModal();

    try {
      const data = {
        subject,
        nama,
        mobile_number: mobile_no.replace(/^0/, "62"),
        issue_type,
        description,
      };

      const response = await postIssue(data);
      if (response && response.data) {
        const message =
          `Halo ${nama},\n\n` +
          `Berikut adalah pesan yang Anda kirimkan:\n\n` +
          `*${description}*\n\n` +
          `Jika ada pertanyaan lebih lanjut, silakan hubungi kami kembali.\nTerima kasih.`;

        await apiSendWa(mobile_no, message);

        notification.success({
          message: "Berhasil Dikirim",
          description: "Pertanyaan kamu sudah berhasil dikirim",
          placement: "topRight",
        });
        setFormData({});
        recaptchaRef.current?.reset();
        return
      } else {
        notification.error({
          message: "Gagal Mengirim",
          description: response.message || "Data gagal dikirim",
          placement: "top",
        });
      }
    } catch (error) {   
      notification.error({
        message: "Kesalahan",
        description: "Terjadi kesalahan saat mengirim data",
        placement: "topRight",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getIssueTypeList();
        setIssueType(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
    {loading && <Spin spinning={loading} fullscreen />}
  
    {!modal && (
      <FloatButton
        icon={<QuestionCircleOutlined style={{ fontSize: 18 }} />}
        type="primary"
        style={{ right: 30, bottom: 24, width: 40, height: 40, poistion: `fixed` }}
        onClick={showModal}
      />
    )}
  
    {modal && (
      <div
        className="fixed top-[75px] right-6 z-[1050] w-[360px] max-w-[90vw] rounded-xl overflow-hidden bg-white shadow-lg"
        role="dialog"
      >
        <div className="w-full">
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <h5 className="text-sm font-semibold">Form Pertanyaan</h5>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="px-4 pt-3 pb-2 space-y-3">
              <div>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  placeholder="Full Name"
                  value={formData.nama}
                  onChange={handleChange}
                  autoFocus
                  required
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
              <div>
                <input
                  type="number"
                  id="floatingMobile"
                  name="mobile_no"
                  placeholder="Mobile Number"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="floatingSubject"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
  
              <div>
                <select
                  id="floatingSelect"
                  name="issue_type"
                  value={formData.issue_type}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
                >
                  <option value="">-- Issue Type--</option>
                  {issueType.length > 0 &&
                    issueType.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
  
              <div>
                <textarea
                  name="description"
                  placeholder="Your Message"
                  id="floatingTextarea2"
                  style={{ height: "80px" }}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring focus:border-blue-400"
                ></textarea>
              </div>
  
              <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_CAPTCHA_APIKEY}
                />
              </div>
            </div>
  
            <div className="flex justify-end gap-2 px-4 pt-2 pb-3 border-t">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  
  );
};

export default FloatingChatButton;
