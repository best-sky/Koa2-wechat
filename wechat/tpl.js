const ejs = require('ejs')


const tpl = `
<xml>
    <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
    <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
    <CreateTime><%= createTime %></CreateTime>
    <% if (msgType === 'text') { %>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[<%= content %>]]></Content>
    <% } else if (msgType === 'image') { %>
        <Image>
        <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
        </Image>
    <% } else if (msgType === 'voice') { %>
        <Voice>
        <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
        </Voice>
    <% } else if (msgType === 'video') { %>
        <Video>
        <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
        <Title><![CDATA[<%= content.Title %>]]></Title>
        <Description><![CDATA[<%= content.Description %>]]></Description>
        </Video>
    <% } else if (msgType === 'music') { %>
        <Music>
        <Title><![CDATA[<%= content.Title %>]]></Title>
        <Description><![CDATA[<%= content.Description %>]]></Description>
        <MusicUrl><![CDATA[<%= content.musicUrl %>]]></MusicUrl>
        <HQMusicUrl><![CDATA[<%= content.hqMusicUrl %>]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
        </Music>
    <% } else if (msgType === 'news') { %>
        <ArticleCount><![CDATA[<%= content.length %>]]></ArticleCount>
        <Articles>
        <% content.forEach(function(item){ %>
            <item>
                <Title><![CDATA[<%= item.title %>]]></Title>
                <Description><![CDATA[<%= item.description %>]]></Description>
                <PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
                <Url><![CDATA[<%= item.Url %>]]></Url>
            </item>
        <% }) %>
        </Articles>
    <% } %>   
</xml>
`
const compiled = ejs.compile(tpl)

module.exports = compiled