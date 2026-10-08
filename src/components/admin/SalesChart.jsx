
import { BarChart3 } from "lucide-react";

function SalesChart({ sales = [] }) {
  const monthlySales = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));

    const monthName = date.toLocaleString("en-US", {
      month: "short",
    });

    const month = date.getMonth();
    const year = date.getFullYear();

    const total = sales
      .filter((sale) => {
        if (!sale.date) {
          return false;
        }

        const saleDate = new Date(sale.date);

        return (
          saleDate.getMonth() === month &&
          saleDate.getFullYear() === year
        );
      })
      .reduce((sum, sale) => sum + Number(sale.amount || 0), 0);

    return {
      month: monthName,
      total,
    };
  });

  const maxValue = Math.max(
    ...monthlySales.map((item) => item.total),
    1
  );

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BarChart3 size={20} />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Revenue Overview
              </h2>

              <p className="text-sm text-gray-500">
                Sales revenue for the last 6 months
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm font-semibold text-blue-600">
          ₦
          {monthlySales
            .reduce((sum, item) => sum + item.total, 0)
            .toLocaleString()}
        </div>
      </div>

      <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
        {monthlySales.map((item) => {
          const height =
            item.total > 0
              ? Math.max((item.total / maxValue) * 100, 8)
              : 4;

          return (
            <div
              key={`${item.month}-${item.total}`}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <div className="mb-2 text-center text-xs font-medium text-gray-500">
                {item.total > 0
                  ? `₦${item.total.toLocaleString()}`
                  : "₦0"}
              </div>

              <div className="flex h-full w-full items-end">
                <div
                  className="w-full rounded-t-lg bg-blue-600 transition-all duration-500 hover:bg-blue-700"
                  style={{
                    height: `${height}%`,
                  }}
                  title={`${item.month}: ₦${item.total.toLocaleString()}`}
                />
              </div>

              <p className="mt-3 text-xs font-medium text-gray-500">
                {item.month}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SalesChart;

