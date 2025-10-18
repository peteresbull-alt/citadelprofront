"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

type TicketFormValues = {
  subject: string;
  category: string;
  description: string;
};

type Ticket = {
  id: number;
  subject: string;
  category: string;
  description: string;
  created_at: string;
};

const ServiceDesk = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketFormValues>({
    defaultValues: {
      subject: "",
      category: "",
      description: "",
    },
  });

  // Fetch tickets
  const fetchTickets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(`${BACKEND_URL}/tickets/`, {
        method: "GET",
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tickets");
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
      toast("Ticket Error", {
        description: "Unable to load tickets.",
      });
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Create Ticket
  const onSubmit = async (data: TicketFormValues) => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast("Bad Auth", {
        description: "No authentication token found",
      });
      setLoading(false);
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/tickets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create ticket");
      await res.json();
      toast("Success", {
        description: "Ticket created successfully",
      });

      reset();
      fetchTickets();
    } catch (err) {
      console.error(err);
      toast("Error", {
        description: "An error occurred while creating ticket.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 font-poppins transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center bg-teal-900 dark:bg-gray-800 text-white px-4 py-3 shadow-md">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Service Desk</h1>
      </div>

      {/* Ticket Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 px-4 py-6 space-y-6 max-w-[1000px]"
      >
        {/* Subject */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            Subject
          </label>
          <Input
            {...register("subject", { required: "Subject is required" })}
            className="w-full border-b text-gray-800 dark:text-gray-100 dark:bg-gray-800 border-t-0 border-x-0 rounded-none shadow-none focus:ring-0 focus:border-teal-700 dark:focus:border-teal-400 transition-colors"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            Category
          </label>
          <Input
            {...register("category", { required: "Category is required" })}
            className="w-full border-b text-gray-800 dark:text-gray-100 dark:bg-gray-800 border-t-0 border-x-0 rounded-none shadow-none focus:ring-0 focus:border-teal-700 dark:focus:border-teal-400 transition-colors"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border-b p-3 text-gray-800 dark:text-gray-100 dark:bg-gray-800 border-t-0 border-x-0 rounded-none shadow-none min-h-[100px] resize-none focus:ring-0 focus:border-teal-700 dark:focus:border-teal-400 transition-colors"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Create Ticket Button */}
        <button
          type="submit"
          className="w-full md:w-fit px-4 bg-teal-900 text-white py-3 rounded-lg font-medium hover:bg-teal-800 dark:bg-teal-700 dark:hover:bg-teal-600 transition-colors"
        >
          {!loading ? (
            <span>Create Ticket</span>
          ) : (
            <PulseLoader color="#fff" size={15} />
          )}
        </button>
      </form>

      {/* Ticket List */}
      <div className="px-4 py-6 max-w-[1000px]">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
          My Tickets
        </h2>
        {tickets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No tickets yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-20">
              <thead className="bg-teal-900 dark:bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Subject
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatDate(ticket?.created_at)}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {ticket.subject}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      {ticket.category}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      {ticket.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDesk;
