<div id="soul" class="site-about py-5">
    <div class="container-fluid container-md">
        <div class="row">
            <div class="col-12 col-md-6">
                <?php echo get_the_post_thumbnail(75, 'full', array('class' => 'alignleft')); ?>
            </div>
            <div class="col-11 col-md-5 offset-1">
                <?php
                echo '<h2 class="mb-5 display-4">' . get_post_field('post_title', 75) . '</h2>';
                $content = apply_filters('the_content', get_post_field('post_content', 75));
                echo $content;
                ?>
            </div>
        </div>
    </div>
</div><!-- #soul -->