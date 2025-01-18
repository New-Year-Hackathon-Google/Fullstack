import axiosInstance from '../axiosInstance';

export const GetHistory = async (patientId: number) => {
  try {
    const response = await axiosInstance.post(`/api/v1/patients/statuses`, {
      patientId,
    });
    return response.data;
  } catch (error) {
    console.log('환자 기록 리스트 가져오기 실패', error);
  }
};
