// Toggle สำหรับเปิด/ปิดโหมดจำลองข้อมูล
export const MOCK_MODE = false

// ข้อมูลตัวอย่างสำหรับสร้างบทความจำลอง
const sampleTitles = [
  'วิธีเขียน JavaScript ให้มีประสิทธิภาพ',
  'เริ่มต้นกับ TypeScript สำหรับผู้เริ่มต้น',
  'แนวทางการออกแบบ UI/UX ที่ทันสมัย',
  'การจัดการ State ใน React อย่างมีประสิทธิภาพ',
  'เทคนิคการเขียน CSS ที่ควรรู้',
  'การใช้ Git และ GitHub อย่างมือโปร',
  'เข้าใจ Async/Await ใน JavaScript',
  'สร้าง API ด้วย Node.js และ Express',
  'การทำ SEO สำหรับเว็บไซต์สมัยใหม่',
  'เรียนรู้ Docker สำหรับ Developer',
  'ออกแบบ Database ให้มีประสิทธิภาพ',
  'การใช้ GraphQL แทน REST API',
  'เทคนิคการ Debug แบบมืออาชีพ',
  'สร้าง Progressive Web App',
  'การจัดการ Memory ใน JavaScript',
  'เข้ารหัสและความปลอดภัยในการพัฒนา',
  'การทำ Unit Testing ที่ดี',
  'Performance Optimization เบื้องต้น',
  'การใช้ Webpack และ Build Tools',
  'เทคนิคการเขียน Clean Code',
]

const sampleDescriptions = [
  'เรียนรู้เทคนิคและแนวทางในการเขียนโค้ดที่มีประสิทธิภาพและอ่านง่าย พร้อมตัวอย่างการใช้งานจริง',
  'คู่มือครบถ้วนสำหรับผู้ที่ต้องการเริ่มต้นใช้งานเทคโนโลยีใหม่ๆ ด้วยตัวอย่างที่เข้าใจง่าย',
  'แบ่งปันประสบการณ์และเทคนิคที่ได้จากการทำงานจริง เพื่อการพัฒนาทักษะที่ดีขึ้น',
  'วิธีการจัดการและแก้ไขปัญหาที่พบบ่อยในการพัฒนาแอปพลิเคชัน พร้อมโซลูชันที่ทดลองแล้ว',
  'ค้นพบเครื่องมือและวิธีการใหม่ๆ ที่จะช่วยเพิ่มประสิทธิภาพในการทำงานของนักพัฒนา',
  'เทคนิคขั้นสูงและแนวทางปฏิบัติที่ดีที่สุดสำหรับการพัฒนาโปรเจ็กต์ระดับมืออาชีพ',
  'วิเคราะห์และเปรียบเทียบเทคโนโลยีต่างๆ เพื่อเลือกใช้ให้เหมาะสมกับโปรเจ็กต์',
  'แนวทางการแก้ปัญหาและการปรับปรุงประสิทธิภาพของระบบที่มีอยู่',
  'ความรู้และประสบการณ์ที่ได้จากการทำงานในโปรเจ็กต์จริงต่างๆ',
  'เคล็ดลับและเทคนิคที่จะทำให้การเขียนโค้ดของคุณดีขึ้นอย่างเห็นได้ชัด',
]

const sampleTags = [
  ['JavaScript', 'ES6', 'Performance'],
  ['TypeScript', 'ภาษาโปรแกรม', 'พื้นฐาน'],
  ['UI/UX', 'Design', 'Frontend'],
  ['React', 'State Management', 'JavaScript'],
  ['CSS', 'Styling', 'Frontend'],
  ['Git', 'Version Control', 'Tools'],
  ['JavaScript', 'Async', 'Programming'],
  ['Node.js', 'API', 'Backend'],
  ['SEO', 'Marketing', 'Web'],
  ['Docker', 'DevOps', 'Tools'],
  ['Database', 'SQL', 'Backend'],
  ['GraphQL', 'API', 'Modern'],
  ['Debug', 'Tools', 'Development'],
  ['PWA', 'Mobile', 'Web'],
  ['JavaScript', 'Memory', 'Performance'],
  ['Security', 'Encryption', 'Best Practices'],
  ['Testing', 'Unit Test', 'Quality'],
  ['Performance', 'Optimization', 'Web'],
  ['Webpack', 'Build Tools', 'Frontend'],
  ['Clean Code', 'Best Practices', 'Quality'],
]

import type { BlogPost } from './blogUtils'
import { generateGradientDataURL } from './gradientGenerator'

const sampleImages = [
  '/images/hello-world.jpg',
  'https://picsum.photos/800/450?random=1',
  'https://picsum.photos/800/450?random=2',
  'https://picsum.photos/800/450?random=3',
  'https://picsum.photos/800/450?random=4',
  'https://picsum.photos/800/450?random=5',
]

// Generate gradient placeholders
const gradientPlaceholders = Array.from({ length: 8 }, (_, i) =>
  generateGradientDataURL(i),
)

// ฟังก์ชันสำหรับสร้างข้อมูลบทความจำลอง
export function generateMockPosts(count: number = 1000) {
  const posts: BlogPost[] = []

  for (let i = 1; i <= count; i++) {
    const titleIndex = Math.floor(Math.random() * sampleTitles.length)
    const descIndex = Math.floor(Math.random() * sampleDescriptions.length)
    const tagIndex = Math.floor(Math.random() * sampleTags.length)
    const imageIndex = Math.floor(Math.random() * sampleImages.length)

    // สร้างวันที่แบบสุ่มในช่วง 2 ปีที่ผ่านมา
    const randomDate = new Date()
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 730))

    posts.push({
      title: `${sampleTitles[titleIndex]} #${i}`,
      description: sampleDescriptions[descIndex],
      pubDate: randomDate,
      heroImage:
        Math.random() > 0.3
          ? Math.random() > 0.5
            ? sampleImages[imageIndex]
            : gradientPlaceholders[
                Math.floor(Math.random() * gradientPlaceholders.length)
              ]
          : undefined, // 70% chance of having image (mix of real images and gradients)
      tags: sampleTags[tagIndex],
      slug: `mock-post-${i}`,
    })
  }

  // เรียงตามวันที่ล่าสุด
  return posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
}

// ฟังก์ชันสำหรับจำลองการโหลดหน้าต่อไป (สำหรับ infinite scroll)
export function getMockPostsPage(page: number = 1, limit: number = 20) {
  const allPosts = generateMockPosts(1000)
  const start = (page - 1) * limit
  const end = start + limit

  return {
    posts: allPosts.slice(start, end),
    hasMore: end < allPosts.length,
    totalCount: allPosts.length,
    currentPage: page,
  }
}
