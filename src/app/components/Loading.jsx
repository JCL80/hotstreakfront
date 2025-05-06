export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative w-24 h-32 flex flex-col items-center justify-end">
        {/* Ball */}
        <div
          className="w-20 h-20 bg-orange-500 rounded-full animate-bounce-squash-spin shadow-lg border-4 border-black"
          style={{
            backgroundImage: "url('/basketball-lines.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Shadow */}
        <div className="w-16 h-3 bg-black/20 rounded-full blur-sm mt-2 animate-shadow-grow" />
      </div>
    </div>
  );
}
