// src/components/Footer.tsx
import Image from 'next/image'; // ✅ This import is REQUIRED

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center mb-4">
          <Image 
            src="/logo.png" 
            alt="Vision To The World" 
            width={40} 
            height={40} 
          />
          <span className="font-bold text-xl ml-2">Vision To The World</span>
        </div>
        <p className="text-gray-300 mb-6">Making global travel easy, affordable, and unforgettable.</p>

        <div className="border-t border-gray-800 pt-6 text-xs text-gray-500">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.youtube.com/about/" target="_blank" rel="noopener noreferrer" className="hover:underline">关于</a>
            <a href="https://www.youtube.com/newseroom/" target="_blank" rel="noopener noreferrer" className="hover:underline">新闻</a>
            <a href="https://www.youtube.com/about/copyright/" target="_blank" rel="noopener noreferrer" className="hover:underline">版权</a>
            <a href="https://www.youtube.com/contact/" target="_blank" rel="noopener noreferrer" className="hover:underline">联系我们</a>
            <a href="https://www.youtube.com/creators/" target="_blank" rel="noopener noreferrer" className="hover:underline">创作者</a>
            <a href="https://www.youtube.com/advertise/" target="_blank" rel="noopener noreferrer" className="hover:underline">广告</a>
            <a href="https://developers.google.com/youtube" target="_blank" rel="noopener noreferrer" className="hover:underline">开发者</a>
            <a href="https://www.youtube.com/about/policies/" target="_blank" rel="noopener noreferrer" className="hover:underline">条款</a>
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">隐私权</a>
            <a href="https://www.youtube.com/yt/policyandsafety/" target="_blank" rel="noopener noreferrer" className="hover:underline">政策与安全</a>
            <a href="https://www.youtube.com/howyoutubeworks/" target="_blank" rel="noopener noreferrer" className="hover:underline">YouTube 的运作方式</a>
            <a href="https://www.youtube.com/new" target="_blank" rel="noopener noreferrer" className="hover:underline">测试新功能</a>
          </div>
          <p className="mt-4">&copy; 2025 Google LLC</p>
        </div>
      </div>
    </footer>
  );
}