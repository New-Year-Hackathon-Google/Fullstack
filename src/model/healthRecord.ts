import { Schema, model, models, Model, Document } from 'mongoose';

export interface IHealthRecord extends Document {
  patientId: string; // 환자 ID
  heartRate: number; // 심박수
  bloodPressure: string; // 혈압 (ex: "120/80")
  bloodSugar: number; // 혈당 (mg/dL)
  bodyTemperature: number; // 체온 (°C)
  pulse: number; // 맥박
  oxygenSaturation: number; // 산소포화도 (%)
  additionalNotes: string; // 간호사가 입력하는 기타 정보 (문자열)
  medications: string[]; // 현재 섭취 중인 약
}

const healthRecordSchema = new Schema<IHealthRecord>(
  {
    patientId: { type: String, required: true }, // 필수: 환자 ID
    heartRate: { type: Number, required: true }, // 필수: 심박수
    bloodPressure: { type: String, required: true }, // 필수: 혈압
    bloodSugar: { type: Number, required: true }, // 필수: 혈당
    bodyTemperature: { type: Number, required: true }, // 필수: 체온
    pulse: { type: Number, required: true }, // 필수: 맥박
    oxygenSaturation: { type: Number, required: true }, // 필수: 산소포화도
    additionalNotes: { type: String, default: '' }, // 선택: 기타 정보
    medications: { type: [String], default: [] }, // 선택: 현재 섭취 중인 약
  },
  {
    collection: 'HealthRecords', // 컬렉션 이름
    timestamps: true, // 생성 및 업데이트 시간 자동 기록
  },
);

const HealthRecord: Model<IHealthRecord> =
  models.HealthRecord ||
  model<IHealthRecord>('HealthRecord', healthRecordSchema);

export default HealthRecord;
