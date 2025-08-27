import { Schema, model } from 'mongoose';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';
import { TASK_CATEGORIES } from '../../constants/index.js';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    category: {
      type: String,
      enum: TASK_CATEGORIES,
      default: 'personal',
    },
    dueDate: {
      type: Date,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

taskSchema.post('save', saveErrorHandler);

taskSchema.pre('findOneAndUpdate', setUpdateSettings);

taskSchema.post('findOneAndUpdate', saveErrorHandler);

export const tasksSortFields = [
  '_id',
  'title',
  'description',
  'isDone',
  'priority',
  'category',
  'dueDate',
  'createdAt',
  'updatedAt',
];

const TaskCollection = model('Task', taskSchema);

export default TaskCollection;
