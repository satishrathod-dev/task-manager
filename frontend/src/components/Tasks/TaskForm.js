import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const taskSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
  dueDate: yup.date().required("Due date is required"),
  priority: yup
    .string()
    .oneOf(["High", "Medium", "Low"], "Invalid priority")
    .required("Priority is required"),
  isCompleted: yup.boolean(),
});

const TaskForm = ({ initialData, onSubmit, onClose, mode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      isCompleted: false,
    },
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    } else {
      reset({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        isCompleted: false,
      });
    }
  }, [initialData, mode, reset]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h3 className="text-lg font-semibold mb-4">
          {mode === "edit" ? "Edit Task" : "Create Task"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full p-2 border rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Due Date</label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full p-2 border rounded"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Priority</label>
            <select
              {...register("priority")}
              className="w-full p-2 border rounded"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("isCompleted")}
                className="mr-2"
              />
              Mark as Completed
            </label>
          </div>

          <div className="flex justify-between">
            {mode === "edit" && (
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {mode === "edit" ? "Update" : "Create"}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;