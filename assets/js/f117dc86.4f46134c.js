"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[722],{9154:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>h});var n=s(1527),t=s(6225);const a={slug:"why-is-yazi-fast",title:"Why is Yazi fast?",authors:["sxyazi"]},r=void 0,o={permalink:"/blog/why-is-yazi-fast",editUrl:"https://github.com/yazi-rs/yazi-rs.github.io/edit/main/blog/2023-10-29-why-is-yazi-fast.md",source:"@site/blog/2023-10-29-why-is-yazi-fast.md",title:"Why is Yazi fast?",description:"This article assumes that you have already used Yazi and are familiar with most of its features.",date:"2023-10-29T00:00:00.000Z",tags:[],readingTime:6.545,hasTruncateMarker:!1,authors:[{name:"\u4e09\u54b2\u96c5 \xb7 Misaki Masa",title:"Creator of Yazi",url:"https://github.com/sxyazi",imageURL:"https://github.com/sxyazi.png",key:"sxyazi"}],frontMatter:{slug:"why-is-yazi-fast",title:"Why is Yazi fast?",authors:["sxyazi"]},unlisted:!1},l={authorsImageUrls:[void 0]},h=[{value:"Tokio",id:"tokio",level:2},{value:"Pre-Loading",id:"pre-loading",level:2},{value:"Discardable Tasks",id:"discardable-tasks",level:2},{value:"Code Highlighting",id:"code-highlighting",level:2},{value:"Image Preview",id:"image-preview",level:2},{value:"Async Task Scheduling",id:"async-task-scheduling",level:2},{value:"Other optimizations",id:"other-optimizations",level:2},{value:"TODO",id:"todo",level:2}];function c(e){const i={a:"a",code:"code",em:"em",h2:"h2",li:"li",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.p,{children:"This article assumes that you have already used Yazi and are familiar with most of its features."}),"\n",(0,n.jsx)(i.p,{children:"Yazi has undergone significant optimizations to enhance user experience. It is designed entirely as an async program, handling all time-consuming tasks (I/O and CPU) as async tasks in a non-blocking, event-driven manner."}),"\n",(0,n.jsx)(i.h2,{id:"tokio",children:"Tokio"}),"\n",(0,n.jsx)(i.p,{children:'Internally, Yazi uses Tokio as its async runtime: hold on! Tokio\'s async may not be "truly async" as you might perceive it!'}),"\n",(0,n.jsx)(i.p,{children:"Uh, okay. From an application-layer perspective, it indeed is async; however, from a system-level view, there are possibly better solutions."}),"\n",(0,n.jsxs)(i.p,{children:["But! This is not the current performance bottleneck for Yazi. Considering Yazi is a TUI app, unlike CLI programs like ",(0,n.jsx)(i.code,{children:"ls"})," and ",(0,n.jsx)(i.code,{children:"eza"})," that need to output all files immediately, Yazi has more optimization opportunities at the application-layer:"]}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:["For large directories (e.g., 100,000 files), Yazi uses ",(0,n.jsx)(i.a,{href:"https://github.com/sxyazi/yazi/pull/117",children:"chunked loading"}),", which is unmatched by ",(0,n.jsx)(i.code,{children:"ls"})," and ",(0,n.jsx)(i.code,{children:"eza"})," since they must load everything at once."]}),"\n",(0,n.jsxs)(i.li,{children:["Yazi also preloads directory file lists in the background, an optimization that ",(0,n.jsx)(i.code,{children:"ls"})," and ",(0,n.jsx)(i.code,{children:"eza"})," do not possess."]}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"I must express my gratitude to Tokio for providing an excellent and convenient way to realize these application-layer optimizations."}),"\n",(0,n.jsxs)(i.p,{children:["I believe that the benefits brought by these application-level optimizations are more noticeable compared to switching to solutions like ",(0,n.jsx)(i.code,{children:"io_uring"}),". But I'm open to this and welcome any constructive PR."]}),"\n",(0,n.jsxs)(i.p,{children:["Here is a relevant discussion on Reddit: ",(0,n.jsx)(i.a,{href:"https://www.reddit.com/r/rust/comments/16fxr58/comment/k066gmh/",children:"https://www.reddit.com/r/rust/comments/16fxr58/comment/k066gmh/"})]}),"\n",(0,n.jsx)(i.h2,{id:"pre-loading",children:"Pre-Loading"}),"\n",(0,n.jsx)(i.p,{children:"Preloaders are part of Yazi's concurrent plugin system, and the entire pre-loading process is asynchronous and spans multiple threads. This means that preloaders can handle not only expensive IO tasks but also CPU-bound tasks! Here are some built-in preloaders in Yazi:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:["Mimetype: The baseline. Yazi uses the file's mime-type as a reference for tasks such as opening, previewing, and style rendering, and internally utilizes ",(0,n.jsx)(i.code,{children:"file(1)"})," to obtain the file's mime-type. For better performance, Yazi computes them for files of an entire page, rather than for each file individually, and the entire process is chunked to minimize response latency."]}),"\n",(0,n.jsx)(i.li,{children:"Image: To accelerate image previews, Yazi uses a 2-pass process for image files. The first pass is preprocessing, which downscales the image based on user-set max_width/max_height and generates a compressed lossy image as a cache file, significantly reducing file size. The second pass occurs when the user actually switches to the file and downscales it again to fit the terminal size."}),"\n",(0,n.jsx)(i.li,{children:"Video: To speed up video previews, Yazi pre-converts them into images and goes through the first pass of image processing. When the user needs to display the video, it goes the same second pass."}),"\n",(0,n.jsx)(i.li,{children:"PDF: Similar to video."}),"\n",(0,n.jsx)(i.li,{children:"Directory size: Yazi lazily calculates the directory size only when the user sets sorting by file size, as it's a time-consuming operation."}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"Note: Except for size, all of these are paged, meaning that when you are on the first page, only the first few files will be pre-loaded."}),"\n",(0,n.jsx)(i.p,{children:"For example, if your directory has 1000 files, your terminal height is 10, and you are on the second page, only files 11 to 20 will be processed. This greatly saves resources."}),"\n",(0,n.jsx)(i.h2,{id:"discardable-tasks",children:"Discardable Tasks"}),"\n",(0,n.jsx)(i.p,{children:"Every preview task is discardable. When you navigate between files quickly and the previous file's triggered preview task is still not finished, it will be discarded directly, initiating a new task. This promotes resource utilization:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:["For I/O tasks like loading directory lists, Tokio's ",(0,n.jsx)(i.code,{children:"abort"})," is used;"]}),"\n",(0,n.jsxs)(i.li,{children:["For CPU tasks like code highlighting, an ",(0,n.jsx)(i.code,{children:"Atomic"})," is used to store a ",(0,n.jsx)(i.code,{children:"ticket"}),", and it checks if the value changes on each line code highlight. If it changes, indicates that the current context has changed, and the entire highlighting task is discarded."]}),"\n",(0,n.jsx)(i.li,{children:"For I/O and CPU tasks like previewer/preloader plugins, with Lua, Yazi can check whether these tasks are canceled when a specific number of CPU instructions. If canceled, it interrupts the execution of the Lua script immediately, avoiding wasting more I/O and CPU resources."}),"\n"]}),"\n",(0,n.jsx)(i.h2,{id:"code-highlighting",children:"Code Highlighting"}),"\n",(0,n.jsx)(i.p,{children:"Yazi has built-in code highlighting and keeps it to a minimum for all text files: if your terminal height is 10, only the first 10 lines of the file are read and highlighted."}),"\n",(0,n.jsxs)(i.p,{children:["Other file managers that rely on external programs like ",(0,n.jsx)(i.code,{children:"bat"})," need to wait for ",(0,n.jsx)(i.code,{children:"bat"})," to finish highlighting the ",(0,n.jsx)(i.em,{children:"entire file"})," before displaying only the first 10 lines."]}),"\n",(0,n.jsxs)(i.p,{children:["In cases like JSON that require external program ",(0,n.jsx)(i.code,{children:"jq"}),", Yazi kills ",(0,n.jsx)(i.code,{children:"jq"})," directly after reading the first 10 lines to avoid unnecessary resource consumption."]}),"\n",(0,n.jsx)(i.p,{children:"Since code highlighting is a CPU-bound task, it is distributed among multiple blocking threads, managed through Tokio's spawn_blocking, and is also discardable."}),"\n",(0,n.jsx)(i.h2,{id:"image-preview",children:"Image Preview"}),"\n",(0,n.jsx)(i.p,{children:"Yazi not only has built-in code highlighting but also includes image decoding and downscaling - there is likely nothing faster than having it directly built-in. It is also distributed among multiple threads and is discardable."}),"\n",(0,n.jsx)(i.p,{children:"Besides being fast, Yazi's built-in Kitty graphics protocol, Inline images protocol, and Sixel graphics format allow Yazi to finely control when to display or hide images."}),"\n",(0,n.jsxs)(i.p,{children:["This ensures that in Yazi, there won't be issues, like images stacking on top of each other, or image escape code breaking the entire screen, when navigating through images quickly, as ",(0,n.jsx)(i.code,{children:"stdout"})," is locked while outputting these escape codes. This locking happens after all image data is prepared, so it has no impact on performance."]}),"\n",(0,n.jsx)(i.p,{children:"Yazi even supports partially erasing content in preview images, which is useful for pop-up components (Input, Select). The image won't overlap the input, and when the pop-up disappears, Yazi redraws the image to complete the erased portion automatically."}),"\n",(0,n.jsx)(i.h2,{id:"async-task-scheduling",children:"Async Task Scheduling"}),"\n",(0,n.jsx)(i.p,{children:"In Yazi, tasks are prioritized based on their severity automatically. Yazi categorizes tasks into two types:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Macro tasks: Large and heavy tasks, such as copying large files, typically taking a long time to complete."}),"\n",(0,n.jsx)(i.li,{children:"Micro tasks: Small and urgent tasks, such as fetching file mime-type, pre-loading images, calculating directory size, and so on."}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"This is similar to having big and small cores in a CPU; when the big cores are idle, they help with the micro tasks. Yazi defaults to starting 5 micro workers and 10 macro workers, and these numbers can be configured by the user!"}),"\n",(0,n.jsx)(i.p,{children:"In addition, Yazi introduces a priority scheduling mechanism. Each task has 3 priority levels: low, normal, and high. High-priority tasks can preempt low-priority tasks, applying to both micro and macro tasks. This increases task concurrency, slowing down HOL blocking caused by queuing execution of sudden requests."}),"\n",(0,n.jsx)(i.p,{children:"For complex tasks like file copying, a combination of micro and macro approaches is employed. Micro is used to gather a list of all files to be copied recursively, allowing users to see the number of tasks and their sizes in advance. Macro, on the other hand, handles the actual copying process."}),"\n",(0,n.jsx)(i.p,{children:"The advantage of task scheduling extends beyond providing ample concurrency for I/O and CPU resources; it also indirectly mitigates the depletion of system resources (such as file handles and CPU) due to sudden task surges."}),"\n",(0,n.jsx)(i.h2,{id:"other-optimizations",children:"Other optimizations"}),"\n",(0,n.jsx)(i.p,{children:"The above optimizations are the most noticeable to users, but behind the scenes, Yazi has also done many other optimizations. Include but are not limited to:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:["The re-implemented highly optimized natural sorting algorithm is ",(0,n.jsxs)(i.a,{href:"https://github.com/sxyazi/yazi/pull/237",children:["~6 times faster than the ",(0,n.jsx)(i.code,{children:"natord"})]})," that ",(0,n.jsx)(i.code,{children:"eza"})," uses in case-insensitive sorting."]}),"\n",(0,n.jsx)(i.li,{children:"Yazi caches the directory state that has already been read, avoiding any unnecessary IO operations."}),"\n",(0,n.jsx)(i.li,{children:"When a file in a directory changes, it only updates the changed files rather than re-reading the entire directory list."}),"\n",(0,n.jsx)(i.li,{children:"Merges multiple renders triggered by multiple commands into a single render, avoiding unnecessary CPU consumption."}),"\n",(0,n.jsx)(i.li,{children:"Frequent updates to components, such as progress bars, are rendered independently, which is no cost compared to a complete render."}),"\n",(0,n.jsx)(i.li,{children:"The entire plugin system is designed with an asynchronous-first philosophy to avoid blocking the main thread with time-consuming tasks."}),"\n"]}),"\n",(0,n.jsx)(i.h2,{id:"todo",children:"TODO"}),"\n",(0,n.jsx)(i.p,{children:"I'll find time to continue writing."})]})}function d(e={}){const{wrapper:i}={...(0,t.a)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},6225:(e,i,s)=>{s.d(i,{Z:()=>o,a:()=>r});var n=s(959);const t={},a=n.createContext(t);function r(e){const i=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),n.createElement(a.Provider,{value:i},e.children)}}}]);