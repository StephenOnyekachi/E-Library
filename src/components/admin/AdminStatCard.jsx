
function AdminStatCard({
  title,
  value,
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={22} />
        </div>
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-1 text-2xl font-bold text-gray-900">
        {value}
      </h3>
    </div>
  );
}

export default AdminStatCard;
